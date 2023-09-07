using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MyCRUD_MVC.Models
{
    public class Country
    {
        public int id { get; set; }
        [DisplayName("Страна"), Required(ErrorMessage = "Страна обязательное поле")]        
        public string name { get; set; }
        //[DisplayName("Столица"), Required, MaxLength(100), MinLength(3), EmailAddress(ErrorMessage = "Invalid Email Address")]
        [DisplayName("Столица"), EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string capital { get; set; }
        [DisplayName("Население"), Required, Range(1000, 1000000)]
        public int population { get; set; }
    }

    public class Country2
    {
        public string name { get; set; }
        public string capital { get; set; }
        public int population { get; set; }
    }
}