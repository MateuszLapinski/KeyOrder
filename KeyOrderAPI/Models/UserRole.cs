using System.ComponentModel.DataAnnotations;

namespace KeyOrderAPI.Models
{
    public class UserRole
    {
        [Key]
        public int RoleID { get; set; }
        public string RoleName { get; set; }
        public string Description { get; set; }
        public DateTime? CreatedAt { get; set; }
      
    }
}