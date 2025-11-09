using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class ChildDept
    {
        [Key]  // 👈 Define como chave primária
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int childDeptId { get; set; }

        public string parentDeptName { get; set; }
        public string departmentName { get; set; }
    }
}
