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
    }

    public class City
    {
        public int id { get; set; }
        public string name { get; set; }
    }
}