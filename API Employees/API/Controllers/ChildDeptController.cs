using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChildDeptController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ChildDeptController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChildDept>>> GetAll()
        {
            return await _context.ChildDept.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ChildDept>> Get(int id)
        {
            var dept = await _context.ChildDept.FindAsync(id);
            if (dept == null) return NotFound();
            return dept;
        }


        [HttpPost("Create")]
        public async Task<ActionResult<ChildDept>> Post(ChildDept dept)
        {
            _context.ChildDept.Add(dept);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = dept.childDeptId }, dept);
        }

        [HttpPut("Update/{id}")]
        public async Task<IActionResult> Put(int id, ChildDept dept)
        {
            if (id != dept.childDeptId) return BadRequest();
            _context.Entry(dept).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var dept = await _context.ChildDept.FindAsync(id);
            if (dept == null) return NotFound();
            _context.ChildDept.Remove(dept);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
