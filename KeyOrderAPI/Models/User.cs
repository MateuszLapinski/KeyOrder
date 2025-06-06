using System;

namespace KeyOrder.Models
{
    public class User
    {
        public int UserID { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? PasswordHash { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? PhoneNumber { get; set; }
        public int RoleID { get; set; }
        public bool IsActive { get; set; }
        public bool IsLocked { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? LastLoginAt { get; set; }
        public bool TwoFactorEnabled { get; set; }
        public string? Language { get; set; }
        public string? ProfileImageURL { get; set; }
        public string? Notes { get; set; }
    }
}
