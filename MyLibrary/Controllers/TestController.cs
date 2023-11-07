using ClosedXML.Excel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyLibrary.Abstract;
using MyLibrary.Model;
using MyLibrary.ViewModel;

namespace MyLibrary.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class TestController : ControllerBase
    {

        [HttpGet, Route("test")]
        public ActionResult test()
        {
            return Ok("test");
        }


    }
}
