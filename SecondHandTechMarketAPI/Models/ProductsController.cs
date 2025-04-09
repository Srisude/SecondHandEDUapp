using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SecondHandTechMarketAPI.Models;

namespace SecondHandTechMarketAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly SecondHandTechMarketContext _context;
        private readonly IWebHostEnvironment _env;

        public ProductsController(SecondHandTechMarketContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // ✅ Kategori listesini döner
        [HttpGet("categories")]
        public IActionResult GetCategories()
        {
            var categories = new List<string>
            {
                "Laptops",
                "Smartphones",
                "Tablets",
                "Accessories",
                "Audio",
                "Gaming",
                "Other"
            };

            return Ok(categories);
        }

        // ✅ Tüm ürünleri getir
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products
                .Include(p => p.Seller)
                .ToListAsync();
        }

        // ✅ Belirli ürün ID'sine göre getir
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products
                .Include(p => p.Seller)
                .FirstOrDefaultAsync(p => p.ProductId == id);

            if (product == null)
                return NotFound();

            return product;
        }

        // ✅ Yeni ürün oluştur
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct([FromForm] Product product, IFormFile? image)
        {
            if (image != null)
            {
                string fileName = Guid.NewGuid() + Path.GetExtension(image.FileName);
                string path = Path.Combine(_env.WebRootPath, "images", fileName);

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }

                product.ImageUrl = $"/images/{fileName}";
            }

            product.CreatedAt = DateTime.Now;
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProduct), new { id = product.ProductId }, product);
        }

        // ✅ Mevcut ürünü güncelle
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, [FromForm] Product product, IFormFile? image)
        {
            if (id != product.ProductId)
                return BadRequest();

            var existingProduct = await _context.Products.FindAsync(id);
            if (existingProduct == null)
                return NotFound();

            existingProduct.Name = product.Name;
            existingProduct.Description = product.Description;
            existingProduct.Price = product.Price;
            existingProduct.Category = product.Category;
            existingProduct.Condition = product.Condition;
            existingProduct.SellerId = product.SellerId;

            if (image != null)
            {
                string fileName = Guid.NewGuid() + Path.GetExtension(image.FileName);
                string path = Path.Combine(_env.WebRootPath, "images", fileName);

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }

                existingProduct.ImageUrl = $"/images/{fileName}";
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // ✅ Ürünü sil
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
                return NotFound();

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
