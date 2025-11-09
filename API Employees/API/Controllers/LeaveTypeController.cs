using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveTypeController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LeaveTypeController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LeaveType>>> GetAll()
        {
            return await _context.LeaveType.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<LeaveType>> Get(int id)
        {
            var type = await _context.LeaveType.FindAsync(id);
            if (type == null) return NotFound();
            return type;
        }

        [HttpPost("Create")]
        public async Task<ActionResult<LeaveType>> Post(LeaveType type)
        {
            _context.LeaveType.Add(type);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = type.leaveTypeId }, type);
        }

        [HttpPut("Update/{id}")]
        public async Task<IActionResult> Put(int id, LeaveType type)
        {
            if (id != type.leaveTypeId) return BadRequest();
            _context.Entry(type).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var type = await _context.LeaveType.FindAsync(id);
            if (type == null) return NotFound();
            _context.LeaveType.Remove(type);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
