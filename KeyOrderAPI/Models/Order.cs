using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KeyOrderAPI.Models
{
    [Table("Orders", Schema = "dbo")]
    public class Order
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime PlacedAt { get; set; }

        [ForeignKey(nameof(Client))]
        public int ClientId { get; set; }
        public Client? Client { get; set; }

        [Required, StringLength(20)]
        public string Status { get; set; } = "New";

        [NotMapped]
        public string StatusColor =>
            Status == "Shipped" ? "primary" :
            Status == "Cancelled" ? "danger" :
            Status == "New" ? "warning" :
                                   "secondary";

        [Column(TypeName = "decimal(18,2)")]
        public decimal Value { get; set; }

        [Required, StringLength(200)]
        public string ShippingAddress { get; set; } = null!;

        [Required, StringLength(50)]
        public string PaymentMethod { get; set; } = null!;

        [Column(TypeName = "nvarchar(max)")]
        public string? Notes { get; set; }


    }
}
