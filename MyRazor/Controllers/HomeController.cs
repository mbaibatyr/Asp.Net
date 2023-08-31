using Dapper;
using MyRazor.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyRazor.Controllers
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

        public ActionResult HelperView()
        {
            ViewBag.Blablabla = "hello step";
            using (SqlConnection db = new SqlConnection(ConfigurationManager.AppSettings["db"]))
            {
                var result = db.Query<Car>("select brand  + ' - ' + model as BrandModel from car");
                ViewData["lst"] = result;
                return View(result);
            }

        }
    }
}