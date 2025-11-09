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
    public class EmployeeController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmployeeController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Employee
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            if (_context == null || _context.Employee == null)
                return Problem("O contexto ou o conjunto 'Employee' está nulo. Verifique o AppDbContext.");

            var employees = await _context.Employee.ToListAsync();
            return Ok(employees);
        }

        // GET: api/Employee/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            if (_context == null || _context.Employee == null)
                return NotFound("O contexto do banco de dados não foi inicializado.");

            var employee = await _context.Employee.FindAsync(id);
            if (employee == null)
                return NotFound($"Funcionário com ID {id} não encontrado.");

            return Ok(employee);
        }

        // POST: api/Employee/Create
        [HttpPost("Create")]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
            if (_context == null || _context.Employee == null)
                return Problem("Entity set 'AppDbContext.Employee' é nulo.");

            _context.Employee.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEmployee), new { id = employee.employeeId }, employee);
        }

        // PUT: api/Employee/Update/{id}
        [HttpPut("Update/{id}")]
        public async Task<IActionResult> PutEmployee(int id, Employee employee)
        {
            if (id != employee.employeeId)
                return BadRequest("O ID da URL não corresponde ao ID do funcionário.");

            if (_context == null)
                return Problem("O contexto está nulo.");

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                    return NotFound($"Funcionário com ID {id} não encontrado.");
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/Employee/Delete/{id}
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            if (_context == null || _context.Employee == null)
                return NotFound("Contexto ou tabela de funcionários não encontrada.");

            var employee = await _context.Employee.FindAsync(id);
            if (employee == null)
                return NotFound($"Funcionário com ID {id} não encontrado.");

            _context.Employee.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Método auxiliar
        private bool EmployeeExists(int id)
        {
            return (_context?.Employee?.Any(e => e.employeeId == id)).GetValueOrDefault();
        }
    }
}
