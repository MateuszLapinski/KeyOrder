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
    public class LoginHistoryController : ControllerBase
    {
        private readonly KeyOrderContext _context;
        public LoginHistoryController(KeyOrderContext context) => _context = context;


        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetAll() =>       
            await _context.LoginHistory.ToListAsync();
        

        [HttpGet("{id}")]
        public async Task<ActionResult<object>> Get(int id)
        {
          var LoginHistory = await _context.LoginHistory.FindAsync(id);
            if (LoginHistory == null) return NotFound();
            return LoginHistory;
        }

        [HttpPost]
        public async Task<ActionResult<object>> Create(LoginHistory loginsHistory)
        {     
            _context.LoginHistory.Add(loginsHistory);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = loginsHistory.LoginID }, loginsHistory);
          
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, LoginHistory dto)
        {

            if (id != dto.LoginID) return BadRequest();
            _context.Entry(dto).State = EntityState.Modified;
            try { await _context.SaveChangesAsync(); }
            catch (DbUpdateConcurrencyException) when (!_context.LoginHistory.Any(e => e.LoginID == id))
            { return NotFound(); }
            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var inv = await _context.LoginHistory.FindAsync(id);
            if (inv == null) return NotFound();

            _context.LoginHistory.Remove(inv);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}

