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

}
