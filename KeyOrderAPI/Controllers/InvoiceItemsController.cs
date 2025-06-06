// Controllers/InvoiceItemssController.cs
using KeyOrderAPI.Data;
using KeyOrderAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KeyOrderAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceItemssController : ControllerBase
    {
        private readonly KeyOrderContext _context;
        public InvoiceItemssController(KeyOrderContext context) => _context = context;

        // GET: api/InvoiceItemss
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InvoiceItem>>> GetAll() =>
            await _context.InvoiceItems.ToListAsync();

        // GET: api/InvoiceItemss/5
        [HttpGet("{id}")]
        public async Task<ActionResult<InvoiceItem>> Get(int id)
        {
            var InvoiceItems = await _context.InvoiceItems.FindAsync(id);
            if (InvoiceItems == null) return NotFound();
            return InvoiceItems;
        }

        // POST: api/InvoiceItemss
        [HttpPost]
        public async Task<ActionResult<InvoiceItem>> Create(InvoiceItem InvoiceItems)
        {
            _context.InvoiceItems.Add(InvoiceItems);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = InvoiceItems.Id }, InvoiceItems);
        }

        // PUT: api/InvoiceItemss/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, InvoiceItem dto)
        {
            if (id != dto.Id) return BadRequest();
            _context.Entry(dto).State = EntityState.Modified;
            try { await _context.SaveChangesAsync(); }
            catch (DbUpdateConcurrencyException) when (!_context.InvoiceItems.Any(e => e.Id == id))
            { return NotFound(); }
            return NoContent();
        }

        // DELETE: api/InvoiceItemss/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var InvoiceItems = await _context.InvoiceItems.FindAsync(id);
            if (InvoiceItems == null) return NotFound();
            _context.InvoiceItems.Remove(InvoiceItems);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
