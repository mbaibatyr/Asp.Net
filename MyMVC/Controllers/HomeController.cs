using MyMVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyMVC.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Address()
        {
            ViewBag.Message = "Your Address is Abaya 89";
            ViewData["param2"] = "param2";
            Session["param1"] = "excel";
            List<City> lst = new List<City>()
            {
                new City{ Id=1, Name="Astana"},
                new City{ Id=2, Name="Almaty"},
                new City{ Id=3, Name="Aktobe"}
            };
            ViewData["lst"] = lst;
            return View();
        }

        public ActionResult getCity()
        {
            List<City> lst = new List<City>()
            {
                new City{ Id=1, Name="Astana"},
                new City{ Id=2, Name="Almaty"},
                new City{ Id=3, Name="Aktobe"}
            };
            return View(lst);
        }


    }
}