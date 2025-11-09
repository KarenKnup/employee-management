using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class LeaveType
    {
        [Key]  // 👈 Define como chave primária
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int leaveTypeId { get; set; }

        public string typeName { get; set; }
    }
}
