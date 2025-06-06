using KeyOrderAPI.Data;
using KeyOrderAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KeyOrderAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientsController : ControllerBase
    {
        private readonly KeyOrderContext _ctx;
        public ClientsController(KeyOrderContext ctx) => _ctx = ctx;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await _ctx.Clients
                .Select(c => new
                {
                    c.Id,
                    c.Name,
                    c.Email,
                    c.Phone,
                    c.Status,
                    c.Address,
                    c.Country,
                    c.LoyaltyPoints,
                    registrationDate = c.RegistrationDate.ToString("yyyy-MM-dd")
                })
                .ToListAsync();

            return Ok(list);
        }

        [HttpGet("{id}", Name = "GetById")]
        public async Task<IActionResult> GetById(int id)
        {
            var c = await _ctx.Clients.FindAsync(id);
            return c is null ? NotFound() : Ok(c);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Client client)
        {
            client.Id = 0;
            client.RegistrationDate = DateTime.UtcNow;

            _ctx.Clients.Add(client);
            await _ctx.SaveChangesAsync();

            return CreatedAtRoute("GetById", new { id = client.Id }, client);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Client dto)
        {
            if (id != dto.Id) return BadRequest();
            _ctx.Entry(dto).State = EntityState.Modified;

            try { await _ctx.SaveChangesAsync(); }
            catch (DbUpdateConcurrencyException) when (!_ctx.Clients.Any(c => c.Id == id))
            { return NotFound(); }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var client = await _ctx.Clients.FindAsync(id);
            if (client is null) return NotFound();

            _ctx.Clients.Remove(client);
            await _ctx.SaveChangesAsync();
            return NoContent();
        }
    }
}
