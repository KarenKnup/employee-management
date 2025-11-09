using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EarnedLeaveController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EarnedLeaveController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EarnedLeave>>> GetAll()
        {
            return await _context.EarnedLeave.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EarnedLeave>> Get(int id)
        {
            var earned = await _context.EarnedLeave.FindAsync(id);
            if (earned == null) return NotFound();
            return earned;
        }

        [HttpGet("Employee/{employeeId}")]
        public async Task<ActionResult<EarnedLeave>> GetByEmployeeId(int employeeId)
        {
            var earned = await _context.EarnedLeave
                .FirstOrDefaultAsync(e => e.employeeId == employeeId);

            if (earned == null)
                return NotFound();

            return earned;
        }


        [HttpPost("Create")]
        public async Task<ActionResult<EarnedLeave>> Post(EarnedLeave earned)
        {
            _context.EarnedLeave.Add(earned);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = earned.earnedLeaveId }, earned);
        }

        [HttpPut("Update/{id}")]
        public async Task<IActionResult> Put(int id, EarnedLeave earned)
        {
            if (id != earned.earnedLeaveId) return BadRequest();
            _context.Entry(earned).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var earned = await _context.EarnedLeave.FindAsync(id);
            if (earned == null) return NotFound();
            _context.EarnedLeave.Remove(earned);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
