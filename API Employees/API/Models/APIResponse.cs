using Microsoft.OpenApi.Any;

namespace API.Models
{
    public class APIResponse
    {
        public string message;
        public Boolean result;
        public AnyType data;
    }
}
