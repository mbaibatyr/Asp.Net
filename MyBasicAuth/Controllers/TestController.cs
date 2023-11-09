using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyBasicAuth.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class TestController : ControllerBase
    {
        [HttpGet, Route("getHello/{name}")]
        public ActionResult getHello(string name)
        {
            return Ok("Hello " + name);
        }


        [HttpGet, Route("getHello2/{name}")]
        [AllowAnonymous]
        public ActionResult getHello2(string name)
        {
            return Ok("Hello2 " + name);
        }
    }
}
