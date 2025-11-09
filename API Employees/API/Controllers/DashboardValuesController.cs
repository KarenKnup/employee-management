using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardValuesController : ControllerBase
    {
         private readonly AppDbContext _context;

         public DashboardValuesController(AppDbContext context)
         {
             _context = context;
         }

         // GET: api/DashboardValues
         [HttpGet]
         public async Task<ActionResult<IEnumerable<DashboardValues>>> GetDashboardValues()
         {
             if (_context == null || _context.DashboardValues == null)
                 return Problem("O contexto ou o conjunto 'DashboardValues' está nulo. Verifique o AppDbContext.");

             var dashboard = await _context.DashboardValues.ToListAsync();
             return Ok(dashboard);
         }

        // GET: api/DashboardValues/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DashboardValues>> GetDashboardValue(int id)
        {
            if (_context == null || _context.DashboardValues == null)
                return NotFound("O contexto do banco de dados não foi inicializado.");

            var dashboard = await _context.DashboardValues.FindAsync(id);
            if (dashboard == null)
                return NotFound($"Dashboard com ID {id} não encontrado.");

            return Ok(dashboard);
        }

        // PUT: api/DashboardValues/Update/{id}
        [HttpPut("Update/{id}")]
        public async Task<IActionResult> Put(int id, DashboardValues dashboard)
        {
            if (id != dashboard.dashboardId) return BadRequest();
            _context.Entry(dashboard).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }



    }
}

