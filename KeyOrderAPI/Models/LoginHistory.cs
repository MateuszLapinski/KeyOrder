using System.ComponentModel.DataAnnotations;

namespace KeyOrderAPI.Models
{
    public class LoginHistory
    {

        [Key]
        public int LoginID { get; set; }

        public int UserID { get; set; }
        public string UsernameAttempted { get; set; }
        public DateTime LoginTimestamp { get; set; } = DateTime.Now;
        public string IPAddress { get; set; }
        public string UserAgent { get; set; }
        public bool WasSuccessful { get; set; }

        public string? FailureReason { get; set; }



    }
}
