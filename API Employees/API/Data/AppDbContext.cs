using API.Controllers;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // ✅ Sempre inicialize com null! para evitar NullReference em EF Core
        public DbSet<Employee> Employee { get; set; } = null!;
        public DbSet<ParentDept> ParentDept { get; set; } = null!;
        public DbSet<ChildDept> ChildDept { get; set; } = null!;
        public DbSet<EarnedLeave> EarnedLeave { get; set; } = null!;
        public DbSet<LeaveType> LeaveType { get; set; } = null!;
        public DbSet<LeaveRequest> LeaveRequest { get; set; } = null!;
        public DbSet<DashboardValues> DashboardValues { get; set; } = null!;
    }
}
