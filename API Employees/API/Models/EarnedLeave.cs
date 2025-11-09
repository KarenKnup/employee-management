using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class EarnedLeave
    {
        [Key]  // 👈 Define como chave primária
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int earnedLeaveId { get; set; }

        public int employeeId { get; set; }
        public int totalEarnedLeaves { get; set; }
        public int totalSickEarnedLeaves { get; set; }
        public string lastUpdatedDate { get; set; }
        public string employeeName { get; set; }

    }
}
