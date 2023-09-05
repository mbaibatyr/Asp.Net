using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyCRUD_MVC.Models
{
    public class Result
    {
        public string result { get; set; }
        public string error { get; set; }
        public Status status { get; set; }
    }

    public enum Status
    {
        OK,
        ERROR
    }
}