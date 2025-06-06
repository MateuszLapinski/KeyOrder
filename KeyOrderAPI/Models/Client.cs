using System;
using System.Collections.Generic;

namespace KeyOrderAPI.Models
{
    public class Client
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Status { get; set; }

        public string Address { get; set; }
        public string Country { get; set; }
        public int LoyaltyPoints { get; set; } = 0;
        public DateTime RegistrationDate { get; set; } = DateTime.UtcNow;

        public ICollection<Order> Orders { get; set; } = new List<Order>();
        public ICollection<Invoice> Invoices { get; set; } = new List<Invoice>();
    }
}
