using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Data;

namespace AddConsole
{
    public class Program
    {
        static void JsonToDataTable()
        {
            string content = File.ReadAllText(@"C:\Users\байбатыровм\Desktop\test.json");
            DataTable dt = (DataTable)JsonConvert.DeserializeObject(content, (typeof(DataTable)));
            foreach (DataRow item in dt.Rows)
            {
                Console.WriteLine($"{item[0].ToString()} - {item[1].ToString()} ");
            }
        }

        static void JsonToClass()
        {
            string content = File.ReadAllText(@"C:\Users\байбатыровм\Desktop\test2.json");
            var result = JsonConvert.DeserializeObject<RootCity>(content);
            foreach (Data item in result.data)
            {
                Console.WriteLine($"{item.id} - {item.name} ");
            }
        }

        static void JsonToArray()
        {
            string content = File.ReadAllText(@"C:\Users\байбатыровм\Desktop\test.json");
            JArray jsonArray = JArray.Parse(content);
            foreach (var item in jsonArray)
            {
                Console.WriteLine($"{item["id"].ToString()} - {item["name"].ToString()} ");
            }
        }

        public static void Main()
        {
            //JsonToDataTable();
            //JsonToClass();
            JsonToArray();
        }
    }



    public class RootCity
    {
        public Data[] data { get; set; }
    }

    public class Data
    {
        public int id { get; set; }
        public string name { get; set; }
    }




}


