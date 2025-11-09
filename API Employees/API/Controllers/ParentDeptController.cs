using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParentDeptController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ParentDeptController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ParentDept>>> GetAll()
        {
            return await _context.ParentDept.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ParentDept>> Get(int id)
        {
            var dept = await _context.ParentDept.FindAsync(id);
            if (dept == null) return NotFound();
            return dept;
        }

        [HttpPost("Create")]
        public async Task<ActionResult<ParentDept>> Post(ParentDept dept)
        {
            _context.ParentDept.Add(dept);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = dept.departmentId }, dept);
        }

        [HttpPut("Update/{id}")]
        public async Task<IActionResult> Put(int id, ParentDept dept)
        {
            if (id != dept.departmentId) return BadRequest();
            _context.Entry(dept).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var dept = await _context.ParentDept.FindAsync(id);
            if (dept == null) return NotFound();
            _context.ParentDept.Remove(dept);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
