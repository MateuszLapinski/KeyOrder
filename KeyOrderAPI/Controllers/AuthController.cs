using System;
using System.Text;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using BCrypt.Net;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using KeyOrderAPI.Data;
using KeyOrderAPI.DTO;
using KeyOrderAPI.Models;
using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using KeyOrderAPI.E_mail;

namespace KeyOrderAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly KeyOrderContext _context;
        private readonly IConfiguration _config;
        private readonly IEmailSender _smtpClient;

        public AuthController(KeyOrderContext context, IConfiguration config, IEmailSender smtpClient)
        {
            _context = context;
            _config = config;
            _smtpClient = smtpClient;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginDTO dto)
        {
            var ip = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";
            var userAgent = Request.Headers["User-Agent"].ToString() ?? "unknown";
            var timestamp = DateTime.UtcNow;

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == dto.Login || u.Email == dto.Login);

            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            {
                await RecordLogin(false, user?.UserID, dto.Login, "Invalid credentials", ip, userAgent, timestamp);
                return Unauthorized(new { message = "Invalid login or password." });
            }

            await RecordLogin(true, user.UserID, user.Username, null, ip, userAgent, timestamp);
            HttpContext.Session.SetInt32("UserId", user.UserID);
            var token = GenerateJwtToken(user);

            return Ok(new
            {
                userId = user.UserID,
                username = user.Username,
                token,
                message = "Login successful"
            });
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<ActionResult<UserProfileDto>> GetCurrentUser()
        {
            var sub = User.FindFirstValue(ClaimTypes.NameIdentifier)
                   ?? User.FindFirstValue(JwtRegisteredClaimNames.Sub);
            if (sub == null || !int.TryParse(sub, out var userId))
                return Unauthorized();

            var user = await _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.UserID == userId);

            if (user == null)
                return NotFound();

            var role = await _context.UserRoles
                .AsNoTracking()
                .FirstOrDefaultAsync(r => r.RoleID == user.RoleID);

            var organization = await _context.Organizations
               .AsNoTracking()
               .FirstOrDefaultAsync(o => o.OrganizationID == user.OrganizationID);

            return Ok(new UserProfileDto
            {
                UserID = user.UserID,
                Username = user.Username,
                Email = user.Email,
                FullName = user.FirstName + " " + user.LastName,
                RoleId = user.RoleID,
                RoleName = role?.RoleName,
                OrganizationID = user.OrganizationID,
                OrganizationName = organization?.Name
            });
        }

        [HttpPost("send-confirmation-email")]
        [AllowAnonymous]
        public async Task<IActionResult> SendConfirmationEmail([FromBody] EmailRequestDTO dto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null) return NotFound();

            var code = new Random().Next(100000, 999999).ToString();
            var expiresAt = DateTime.UtcNow.AddMinutes(15);

            var emailCode = new VerificationCode
            {
                Email = dto.Email,
                Code = code,
                CreatedAt = DateTime.UtcNow,
                ExpiresAt = expiresAt
            };

            _context.VerificationCodes.Add(emailCode);
            await _context.SaveChangesAsync();

            try
            {
                var htmlBody = $"""
                    <p>Dziękujemy za rejestrację w KeyOrder.</p>
                    <p>Twój kod potwierdzający to:</p>
                    <h2 style=\"color:#3D0066;\">{code}</h2>
                    <p>Jeśli to nie Ty, zignoruj tę wiadomość.</p>
                """;

                await _smtpClient.SendEmailAsync(
                    to: dto.Email,
                    subject: "Potwierdź rejestrację w KeyOrder",
                    htmlBody: htmlBody
                );

                return Ok(new { message = "E-mail z kodem został wysłany." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpGet("check-email")]
        [AllowAnonymous]
        public async Task<IActionResult> CheckEmail(string email)
        {
            var exists = await _context.Users.AnyAsync(u => u.Email == email);
            return Ok(new { exists });
        }

        [HttpPost("validate-code")]
        [AllowAnonymous]
        public async Task<IActionResult> ValidateCode([FromBody] CodeValidationDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.Code))
                return BadRequest(new { message = "Brakuje e-maila lub kodu." });

            var userCode = await _context.VerificationCodes
                .FirstOrDefaultAsync(c =>
                    c.Email == dto.Email &&
                    c.Code == dto.Code &&
                    c.ExpiresAt > DateTime.UtcNow);

            if (userCode == null)
                return BadRequest(new { message = "Nieprawidłowy lub wygasły kod." });

            _context.VerificationCodes.Remove(userCode); 
            await _context.SaveChangesAsync();

            return Ok(new { message = "Kod potwierdzony." });
        }
        private async Task RecordLogin(
            bool wasSuccessful,
            int? userId,
            string loginAttempted,
            string? failureReason,
            string ip,
            string userAgent,
            DateTime timestamp)
        {
            var entry = new LoginHistory
            {
                UserID = userId ?? 0,
                UsernameAttempted = loginAttempted,
                LoginTimestamp = timestamp,
                IPAddress = ip,
                UserAgent = userAgent,
                WasSuccessful = wasSuccessful,
                FailureReason = failureReason
            };

            _context.LoginHistory.Add(entry);
            await _context.SaveChangesAsync();
        }

        private string GenerateJwtToken(User user)
        {
            var secret = _config["Jwt:Secret"]!;
            var issuer = _config["Jwt:Issuer"]!;
            var audience = _config["Jwt:Audience"]!;
            var expiryMin = int.Parse(_config["Jwt:ExpiryMinutes"]!);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserID.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.Username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var descriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(expiryMin),
                SigningCredentials = creds,
                Issuer = issuer,
                Audience = audience
            };

            var handler = new JwtSecurityTokenHandler();
            var token = handler.CreateToken(descriptor);
            return handler.WriteToken(token);
        }
    }

    public class UserProfileDto
    {
        public int UserID { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? FullName { get; set; }
        public int RoleId { get; set; }
        public string? RoleName { get; set; }
        public int OrganizationID { get; set; }
        public string? OrganizationName { get; set; }
    }

    public class CodeValidationDto
    {
        public string Email { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
    }
}
