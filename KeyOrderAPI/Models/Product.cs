using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KeyOrderAPI.Models
{
    public class Product
    {
       
        public int Id { get; set; }

    
        public string Shortcut { get; set; } = null!;

      
        public string Name { get; set; } = null!;

       
        public decimal UnitPrice { get; set; }

        
        public string? Description { get; set; }

        public int StockQuantity { get; set; }

        public int ReorderLevel { get; set; }

 

        public bool IsActive { get; set; }

       
        public DateTime CreatedAt { get; set; }

      
        public DateTime UpdatedAt { get; set; }
    }
}
