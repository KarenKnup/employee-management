using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveRequestController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LeaveRequestController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LeaveRequest>>> GetAll()
        {
            return await _context.LeaveRequest.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<LeaveRequest>> Get(int id)
        {
            var request = await _context.LeaveRequest.FindAsync(id);
            if (request == null) return NotFound();
            return request;
        }

        [HttpPost("Create")]
        public async Task<ActionResult<LeaveRequest>> Post(LeaveRequest request)
        {
            _context.LeaveRequest.Add(request);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = request.leaveId }, request);
        }

        [HttpPut("Update/{id}")]
        public async Task<IActionResult> Put(int id, LeaveRequest request)
        {
            if (id != request.leaveId) return BadRequest();
            _context.Entry(request).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var request = await _context.LeaveRequest.FindAsync(id);
            if (request == null) return NotFound();
            _context.LeaveRequest.Remove(request);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
