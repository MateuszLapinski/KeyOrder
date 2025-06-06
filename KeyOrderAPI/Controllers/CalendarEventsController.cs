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
    [ApiController] //waliduje model i zwraca 400 przy błędach
    public class CalendarEventsController : ControllerBase //Bazowa klasa bez wsparcia dla widoków (typowe w API).
    {
        private readonly KeyOrderContext _context; 
        public CalendarEventsController(KeyOrderContext context) => _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CalendarEvent>>> GetAll() =>
            await _context.CalendarEvents.ToListAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<CalendarEvent>> Get(int id)
        {
            var ev = await _context.CalendarEvents.FindAsync(id);
            if (ev == null) return NotFound();
            return ev;
        }

        [HttpPost]
        public async Task<ActionResult<CalendarEvent>> Create(CalendarEvent ev)
        {
            _context.CalendarEvents.Add(ev);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = ev.Id }, ev);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, CalendarEvent dto)
        {
            if (id != dto.Id) return BadRequest();
            _context.Entry(dto).State = EntityState.Modified;
            try { await _context.SaveChangesAsync(); }
            catch (DbUpdateConcurrencyException) when (!_context.CalendarEvents.Any(e => e.Id == id))
            { return NotFound(); }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var ev = await _context.CalendarEvents.FindAsync(id);
            if (ev == null) return NotFound();
            _context.CalendarEvents.Remove(ev);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
