using ClosedXML.Excel;
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

        [HttpGet, Route("BookGetById/{id}")]
        public ActionResult BookGetById(string id)
        {
            return Ok(service.BookGetById(id));
        }


        [HttpGet, Route("getExcel")]
        public ActionResult getExcel()
        {
            byte[] content = null;
            var result = service.BookGetAll("all");
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("MySample");
                worksheet.Cell(1, 1).Value = "id";
                worksheet.Cell(1, 2).Value = "title";
                worksheet.Cell(1, 3).Value = "year";
                worksheet.Cell(1, 4).Value = "fio";
                worksheet.Cell(1, 5).Value = "category_name";

                worksheet.Cell(2, 1).InsertData(result);                
                using (MemoryStream ms = new MemoryStream())
                {
                    workbook.SaveAs(ms);
                    content = ms.ToArray();
                }
            }
            return File(content,
                 "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                 "Processes.xlsx");
        }
    }
}
