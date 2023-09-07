using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyCRUD_MVC.Models
{
    public class Country
    {
        public int id { get; set; }
        public string name { get; set; }
        public string capital { get; set; }
        public int population { get; set; }
    }

    public class Country2
    {
        public string name { get; set; }
        public string capital { get; set; }
        public int population { get; set; }
    }
}