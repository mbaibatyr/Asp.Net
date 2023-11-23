using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyEF.Abstract;
using MyEF.Model;
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

        [HttpPost, Route("add")]
        public ActionResult add(City model)
        {
            return Ok(service.add(model));
        }

        [HttpGet, Route("getCityById/{id}")]
        public ActionResult getCityById(int id)
        {
            return Ok(service.getCityById(id));
        }

        [HttpGet, Route("getCityByName/{name}")]
        public ActionResult getCityByName(string name)
        {
            return Ok(service.getCityByName(name));
        }

        [HttpPut, Route("edit")]
        public ActionResult edit(City model)
        {
            return Ok(service.edit(model));
        }
    }
}
