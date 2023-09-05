using MyCRUD_MVC.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyCRUD_MVC.Controllers
{
    public class HomeController : Controller
    {
        CountryServiceDapper service;

        public HomeController()
        {
            service = new CountryServiceDapper();
        }
        public ActionResult Index()
        {
            var model = service.CountryGetById(1);
            ViewData["Country"] = model;
            return View(model);
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