using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KeyOrderAPI.Data;
using KeyOrderAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KeyOrderAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoicesController : ControllerBase
    {
        private readonly KeyOrderContext _context;
        public InvoicesController(KeyOrderContext context) => _context = context;


        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetAll()
        {
            var list = await _context.Invoices
                .Include(i => i.Client)
                .ToListAsync();

            var result = list.Select(i => new
            {
                id = i.Id,
                clientId = i.ClientId,
                clientName = i.Client.Name,
                amount = i.Amount,
                issuedAt = i.IssuedAt.ToString("yyyy-MM-dd"), 
                dueDate = i.DueDate.ToString("yyyy-MM-dd"),
                status = i.Status,
                statusColor = i.Status == "Paid" ? "success"
                              : i.Status == "Pending" ? "warning"
                              : i.Status == "Overdue" ? "danger"
                                                      : "secondary",
                paymentMethod = i.PaymentMethod,
                invoiceType = i.InvoiceType,
                notes = i.Notes
            }).ToList();

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<object>> Get(int id)
        {
            var inv = await _context.Invoices
                .Include(i => i.Client)
                .FirstOrDefaultAsync(i => i.Id == id);

            if (inv == null) return NotFound();

            return Ok(new
            {
                id = inv.Id,
                clientId = inv.ClientId,
                clientName = inv.Client.Name,
                amount = inv.Amount,
                issuedAt = inv.IssuedAt.ToString("yyyy-MM-dd"),
                dueDate = inv.DueDate.ToString("yyyy-MM-dd"),
                status = inv.Status,
                statusColor = inv.Status == "Paid" ? "success"
                              : inv.Status == "Pending" ? "warning"
                              : inv.Status == "Overdue" ? "danger"
                                                        : "secondary",
                paymentMethod = inv.PaymentMethod,
                invoiceType = inv.InvoiceType,
                notes = inv.Notes
            });
        }

        [HttpPost]
        public async Task<ActionResult<object>> Create([FromBody] Invoice invoice)
        {
            _context.Invoices.Add(invoice);
            await _context.SaveChangesAsync();

            var inv = await _context.Invoices
                .Include(i => i.Client)
                .FirstAsync(i => i.Id == invoice.Id);

            return CreatedAtAction(nameof(Get), new { id = inv.Id }, new
            {
                id = inv.Id,
                clientId = inv.ClientId,
                amount = inv.Amount,
                issuedAt = inv.IssuedAt.ToString("yyyy-MM-dd"),
                dueDate = inv.DueDate.ToString("yyyy-MM-dd"),
                status = inv.Status,
                statusColor = inv.Status == "Paid" ? "success"
                              : inv.Status == "Pending" ? "warning"
                              : inv.Status == "Overdue" ? "danger"
                                                        : "secondary",
                paymentMethod = inv.PaymentMethod,
                invoiceType = inv.InvoiceType,
                notes = inv.Notes
            });
        }

    
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Invoice dto)
        {
            if (id != dto.Id)
                return BadRequest("URL id does not match body id.");

            var inv = await _context.Invoices.FindAsync(id);
            if (inv == null) return NotFound();

            inv.ClientId = dto.ClientId;
            inv.Amount = dto.Amount;
            inv.IssuedAt = dto.IssuedAt;
            inv.DueDate = dto.DueDate;
            inv.Status = dto.Status;
            inv.PaymentMethod = dto.PaymentMethod;
            inv.InvoiceType = dto.InvoiceType;
            inv.Notes = dto.Notes;

            await _context.SaveChangesAsync();
            return NoContent();
        }

   
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var inv = await _context.Invoices.FindAsync(id);
            if (inv == null) return NotFound();

            _context.Invoices.Remove(inv);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
