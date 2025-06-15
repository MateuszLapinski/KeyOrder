
using KeyOrderAPI.Data;
using KeyOrderAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KeyOrderAPI.Models
{
    [Table("Organizations")]
    public class Organization
    {
        [Key]
        public int OrganizationID { get; set; }

        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? Industry { get; set; }

        [MaxLength(50)]
        public string? TaxNumber { get; set; }

        [MaxLength(100)]
        public string? Country { get; set; }

        [MaxLength(300)]
        public string? Address { get; set; }

        [EmailAddress]
        public string? ContactEmail { get; set; }

        [Phone]
        public string? ContactPhone { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedAt { get; set; }

        public string? Notes { get; set; }
    }
}

