using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyLibrary.Abstract;
using MyLibrary.ViewModel;

namespace MyLibrary.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        IBook service;
        public BookController(IBook service)
        {
            this.service = service;
        }

        [HttpGet, Route("BookGetAll/{title}")]
        public ActionResult BookGetAll(string title)
        {
            return Ok(service.BookGetAll(title));
        }
    }
}
