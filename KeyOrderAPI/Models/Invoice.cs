
using System.ComponentModel.DataAnnotations.Schema;

namespace KeyOrderAPI.Models
{
    public class Invoice
    {
        public int Id { get; set; }
        public DateTime IssuedAt { get; set; }
        public DateTime DueDate { get; set; }

        public int ClientId { get; set; }
        public Client? Client { get; set; }

        public decimal? Amount { get; set; }
        public string? Status { get; set; }

        public string? PaymentMethod { get; set; }
        public string? InvoiceType { get; set; }
        public string? Notes { get; set; }

   
        [NotMapped]
        public string StatusColor
        {
            get
            {
                return Status == "Paid" ? "success"
                     : Status == "Pending" ? "warning"
                     : Status == "Overdue" ? "danger"
                                           : "secondary";
            }
        }
    }
}
