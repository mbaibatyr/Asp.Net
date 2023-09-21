using MyAuth.Models;
using MyAuth.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyAuth.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        UsersService service;

        public HomeController()
        {
            service = new UsersService();
        }
        public ActionResult Index()
        {           
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }
        [AllowAnonymous]
        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}