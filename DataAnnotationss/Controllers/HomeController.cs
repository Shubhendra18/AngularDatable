using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DataAnnotationss.Models;
namespace DataAnnotationss.Controllers
{
    public class HomeController : Controller
    {
        SampleMVCDBEntities da = new SampleMVCDBEntities();
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Index(UserTable ut)
        {
            da.UserTables.Add(ut);
            da.SaveChanges();
            return View();
        }
        public JsonResult GetUser()
        {
            return Json(da.UserTables.ToList(), JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult DeleteUser(int Id)
        {
            var q = (da.UserTables.Where(k => k.Id == Id).FirstOrDefault());
            if (q != null)
            {
                da.UserTables.Remove(q);
                da.SaveChanges();
            }
            return new EmptyResult();
        }
        [HttpGet]
        public ActionResult UpdateUser(int Id)
        {
            return Json(da.UserTables.Where(k => k.Id == Id).FirstOrDefault(), JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult UpdateUser(UserTable ut)
        {
            var q = da.UserTables.Where(k => k.Id == ut.Id).FirstOrDefault();
            q.Name = ut.Name;
            q.Address = ut.Address;
            q.Email = ut.Email;
            q.Password = ut.Password;
            da.SaveChanges();
            return new EmptyResult();
        }

        [OutputCache(Duration = 20, Location = System.Web.UI.OutputCacheLocation.Any, NoStore = true, VaryByParam = "id")]
        public ActionResult CachData(int id)
        {
            return Content("User Id= " + id + "Current Time= " + DateTime.Now.ToLongTimeString());
        }
    }
}