using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleTest.Model
{
    internal class Data1
    {
    }


    public class Rootobject
    {
        public string Name { get; set; }
        public DataArray[] Data { get; set; }
    }

    public class DataArray
    {
        public string name { get; set; }
        public string language { get; set; }
        public string id { get; set; }
        public string bio { get; set; }
        public float version { get; set; }
    }



    public class RootEmployee
    {
        public DataEmployee[] data { get; set; }

    }

    public class DataEmployee
    {
        public int id { get; set; }
        public string employee_name { get; set; }
        public int employee_salary { get; set; }
        public int employee_age { get; set; }
        public string profile_image { get; set; }
    }


}
