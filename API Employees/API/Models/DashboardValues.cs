using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Controllers
{
    public class DashboardValues
    {
        [Key]  // 👈 Define como chave primária
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int dashboardId { get; set; }

        public int totalEmployee { get; set; }
        public int totalLeaves { get; set; }
        public int totalNewLeaves { get; set; }
        public int totalApprovedLeaves { get; set; }
        public int admins { get; set; }
        public int totalRejectedLeaves { get; set; }
        public int totalEarnedLeaves { get; set; }
    }
}