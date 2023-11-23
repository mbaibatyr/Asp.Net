using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyEF.Abstract;
using MyEF.Service;

namespace MyEF.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        ICity service;
        public CityController(ICity service)
        {
            this.service = service;
        }

        [HttpGet, Route("getAll")]
        public ActionResult getAll()
        {
            return Ok(service.getAll());
        }
    }
}
