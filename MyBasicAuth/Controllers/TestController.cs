using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyBasicAuth.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [HttpGet, Route("getHello")]
        public ActionResult getHello(string name)
        {
            return Ok("Hello " + name);
        }
    }
}
