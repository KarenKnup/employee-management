using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class LeaveRequest
    {
        [Key]  // 👈 Define como chave primária
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int leaveId { get; set; }

        public int employeeId { get; set; }
        public int leaveTypeId { get; set; }
        public string startDate { get; set; }
        public string endDate { get; set; }
        public string status { get; set; }
        public string reason { get; set; }
        public string requestDate { get; set; }
        public string employeeName { get; set; }
        public string contactNo { get; set; }
        public string typeName { get; set; }
    }
}
