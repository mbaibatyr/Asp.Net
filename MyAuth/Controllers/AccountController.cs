using MyAuth.Models;
using MyAuth.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace MyAuth.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        UsersService service;

        public AccountController()
        {
            service = new UsersService();
        }
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult Login(UsersValidateRequest model, string returnUrl)
        {
            UsersValidateResponse result = service.UsersValidate(model);
            if (result.Status == Status.OK)
            {
                FormsAuthentication.RedirectFromLoginPage(model.Login, true);
                if (!string.IsNullOrEmpty(returnUrl))
                    return Redirect(returnUrl);
                return Redirect("~/Home/Index");
            }
            else
            {
                ModelState.AddModelError("", "Логин и/или пароль некорректны");
                return View();
            }
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult Register()
        {
            return View();
        }


        [HttpPost]
        [AllowAnonymous]
        public ActionResult Register(UsersValidateRequest model)
        {
            UsersValidateResponse result = service.UsersRegistration(model);
            if (result.Status == Status.OK)
                return Redirect("~/Account/Login");
            ModelState.AddModelError("", "Login already exists");
            return View();
        }



        [HttpGet]
        public ActionResult LogOut()
        {
            FormsAuthentication.SignOut();
            Session.Abandon();
            FormsAuthentication.RedirectToLoginPage();
            return Redirect("Login");
        }

    }
}