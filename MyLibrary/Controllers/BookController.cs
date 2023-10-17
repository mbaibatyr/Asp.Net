using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyLibrary.Abstract;
using MyLibrary.Model;
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

        [HttpPost, Route("BookAddOrEdit")]
        public ActionResult BookAddOrEdit(Book book)
        {
            return Ok(service.BookAddOrEdit(book));
        }

        [HttpGet, Route("BookDelete/{id}")]
        public ActionResult BookDelete(string id)
        {
            return Ok(service.BookDelete(id));
        }

        [HttpGet, Route("AuthorSelect")]
        public ActionResult AuthorSelect()
        {
            return Ok(service.AuthorSelect());
        }

        [HttpGet, Route("CategorySelect")]
        public ActionResult CategorySelect()
        {
            return Ok(service.CategorySelect());
        }
    }
}
