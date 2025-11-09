using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Employee
    {
        [Key]  // 👈 Define como chave primária
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int employeeId { get; set; }

        public string employeeName { get; set; }
        public string contactNo { get; set; }
        public string emailId { get; set; }
        public int deptId { get; set; }
        public string password { get; set; }
        public string gender { get; set; }
        public string role { get; set; }

    }
}
