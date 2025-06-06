// Data/KeyOrderContext.cs
using KeyOrder.Models;
using KeyOrderAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace KeyOrderAPI.Data
{
    public class KeyOrderContext : DbContext
    {
        public KeyOrderContext(DbContextOptions<KeyOrderContext> options)
            : base(options)
        {
        }

        public DbSet<Client> Clients { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<InvoiceItem> InvoiceItems { get; set; }
        public DbSet<CalendarEvent> CalendarEvents { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Przykład konfiguracji: ustaw precyzję dla cen
         /*   modelBuilder.Entity<Product>()
                .Property(p => p.UnitPrice)
                .HasColumnType("decimal(18,2)");*/

            // Jeśli potrzebujesz dodatkowych konfiguracji (klucze złożone, relacje, wartości domyślne)
            // tutaj możesz je dodać:
            //
            // modelBuilder.Entity<Order>()
            //     .Property(o => o.Value)
            //     .HasColumnType("decimal(18,2)")
            //     .HasDefaultValue(0m);
        }
    }
}
