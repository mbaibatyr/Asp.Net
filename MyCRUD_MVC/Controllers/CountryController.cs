using MyCRUD_MVC.Abstract;
using MyCRUD_MVC.Models;
using MyCRUD_MVC.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyCRUD_MVC.Controllers
{
    public class CountryController : Controller
    {
        ICountry service;
        public CountryController()
        {
            service = new CountryServiceDapper();
        }
        public ActionResult Index()
        {            
            return View(service.CountryGetAll());
        }

        // GET: Country/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        [HttpGet]
        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Create(Country model)
        {
            try
            {
                var result = service.CountryCreate(model);
                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        [HttpGet]
        public ActionResult Edit(int id)
        {
            return View(service.CountryGetById(id));
        }

        
        [HttpPost]
        public ActionResult Edit(Country model)
        {
            try
            {
                var result = service.CountryUpdate(model);
                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Country/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Country/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
