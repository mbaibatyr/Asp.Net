using ConsoleTest.Model;
using Newtonsoft.Json;
//using System.Text.Json;
//using System.Text.Json.Serialization;
using System.Data;

namespace ConsoleTest
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string json = File.ReadAllText(@"C:\Users\байбатыровм\Desktop\json_sample_2.json");
            //DataTable dt = JsonConvert.DeserializeObject<DataTable>(json);
            //foreach (DataRow row in dt.Rows)
            //{
            //    Console.WriteLine($"{row[0].ToString()}  {row[1].ToString()}");                
            //}

            Rootobject result = JsonConvert.DeserializeObject<Rootobject>(json);
            //Rootobject result = JsonSerializer.Serialize<>.DeserializeObject<Rootobject>(json);
            //foreach (DataArray item in result.Data)
            //{
            //    Console.WriteLine($"{item.name}  {item.language}");
            //}

            result.Name = result.Name + "___123";

            string json2 = JsonConvert.SerializeObject(result, Formatting.Indented);
            File.WriteAllText(@"C:\Users\байбатыровм\Desktop\json_sample_2_222.json", json2);
        }
    }
}