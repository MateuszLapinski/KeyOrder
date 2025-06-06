using KeyOrderAPI.Data;
using KeyOrderAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KeyOrderAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly KeyOrderContext _context;

        public RolesController(KeyOrderContext context)
        {
            _context = context;
        }

        // GET: api/Roles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserRole>>> GetRoles()
        {
            return await _context.UserRoles.ToListAsync();
        }

        // GET: api/Roles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserRole>> GetRole(int id)
        {
            var role = await _context.UserRoles.FindAsync(id);
            if (role == null)
                return NotFound();
            return role;
        }

        // POST: api/Roles
        [HttpPost]
        public async Task<ActionResult<UserRole>> PostRole(UserRole role)
        {
            _context.UserRoles.Add(role);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetRole), new { id = role.RoleID }, role);
        }

        // PUT: api/Roles/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRole(int id, UserRole role)
        {
            if (id != role.RoleID) return BadRequest();
            _context.Entry(role).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/Roles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRole(int id)
        {
            var role = await _context.UserRoles.FindAsync(id);
            if (role == null) return NotFound();
            _context.UserRoles.Remove(role);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}