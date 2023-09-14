using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyController.Controllers
{
    [RoutePrefix("admin")]
    public class HomeController : Controller
    {
        [HttpGet, Route("r_1/{a}")]
        public string r_1(string a)
        {            
            return "Hello " + a;
        }

        [HttpGet, Route("r_2/{a}")]
        public ActionResult r_2(string a)
        {
            return Content("Hello " + a);
        }

        [HttpPost, Route("r_3")]
        public ActionResult r_3(City city)
        {
            return Content("Hello " + city.id + " " + city.name);
        }


        [HttpPost, Route("r_4")]
        public ActionResult r_4(List<City> city)
        {
            string st = null;
            foreach (var item in city)
            {
                st += item.name + Environment.NewLine;
            }
            return Content(st);
        }

        [HttpPost, Route("r_5")]
        public void r_5(List<City> city)
        {
            string st = null;
            foreach (var item in city)
            {
                st += item.name + Environment.NewLine;
            }
            Response.Write(st);
        }

        [HttpPost, Route("r_6")]
        public ActionResult r_6(List<City> city)
        {
            return Json(city);
        }

        [HttpGet, Route("r_7/{a}/{b}")]
        public int r_7(int a, int b)
        {
            return a + b;
        }

        [HttpPost, Route("r_7_1/{id}")]
        public int r_7_1(CLass1 cLass1, int id)
        {
            var a = int.Parse(cLass1.a);
            var b = int.Parse(cLass1.b);            
            return a + b + id;
        }

        [HttpPut, Route("Put123")]
        public ActionResult Put123(CLass1 cLass1)
        {
            var a = int.Parse(cLass1.a);
            var b = int.Parse(cLass1.b);
            return Content(a.ToString());
        }

        [HttpDelete, Route("r_7_3/{id}")]
        public ActionResult r_7_3(string id)
        {
            //var a = int.Parse(cLass1.a);
            //var b = int.Parse(cLass1.b);
            return Content(id);
        }
        [HttpPut]
        [Route("r_7_2")]
        public int r_7_2(CLass1 cLass1)
        {
            return 123;
        }


        [HttpPost, Route("r_7_5")]
        public ActionResult r_7_5(CLass1 cLass1)
        {
            var a = double.Parse(cLass1.a);
            var b = double.Parse(cLass1.b);
            var res = a / b;
            return Content(res.ToString());
        }




        /*
            GET - получение данных по url GET_STUDENT/1234
            post - Добавление
            put - обновление
            delete - удаление
        */
    }

    public class City
    {
        public int id { get; set; }
        public string name { get; set; }
    }

    public class CLass1
    {
        public string a { get; set; }
        public string b { get; set; }
    }
}