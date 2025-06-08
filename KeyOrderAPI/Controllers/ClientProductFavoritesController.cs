using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KeyOrderAPI.Data;
using KeyOrderAPI.Models;

namespace KeyOrderAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientProductFavoritesController : ControllerBase
    {
        private readonly KeyOrderContext _context;

        public ClientProductFavoritesController(KeyOrderContext context)
        {
            _context = context;
        }

  
        [HttpGet("{clientId}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetFavorites(int clientId)
        {
            var favIds = await _context.ClientProductFavorites
                .Where(f => f.ClientId == clientId)
                .Select(f => f.ProductId)
                .ToListAsync();

            var products = await _context.Products
                .Where(p => favIds.Contains(p.Id))
                .ToListAsync();

            return Ok(products);
        }

        // POST: api/ClientProductFavorites
        [HttpPost]
        public async Task<ActionResult<ClientProductFavorite>> AddFavorite([FromBody] ClientProductFavorite favorite)
        {
            var exists = await _context.ClientProductFavorites
                .AnyAsync(f => f.ClientId == favorite.ClientId && f.ProductId == favorite.ProductId);

            if (exists)
                return Conflict("Produkt jest już oznaczony jako ulubiony.");

            _context.ClientProductFavorites.Add(favorite);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFavorites), new { clientId = favorite.ClientId }, favorite);
        }

        // DELETE: api/ClientProductFavorites/{clientId}/{productId}
        [HttpDelete("{clientId}/{productId}")]
        public async Task<IActionResult> RemoveFavorite(int clientId, int productId)
        {
            var favorite = await _context.ClientProductFavorites
                .FirstOrDefaultAsync(f => f.ClientId == clientId && f.ProductId == productId);

            if (favorite == null)
                return NotFound();

            _context.ClientProductFavorites.Remove(favorite);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
