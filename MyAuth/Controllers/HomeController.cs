using MyAuth.Models;
using MyAuth.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyAuth.Controllers
{
    //[Authorize]
    public class HomeController : Controller
    {
        UsersService service;

        public HomeController()
        {
            service = new UsersService();
        }
        public ActionResult Index()
        {
            //UsersValidateResponse result = 
            //    service.UsersValidate(new Models.UsersValidateRequest { Login="admin", Password="1234"});
            //ViewData["status"] = result.Status;
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
    }
}