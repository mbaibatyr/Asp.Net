using MyAuth.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyAuth.Controllers
{
    public class AccountController : Controller
    {        
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(Users model)
        {
            ;
            return View();
        }

    }
}