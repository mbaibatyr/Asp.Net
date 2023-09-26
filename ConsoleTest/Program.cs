using ConsoleTest.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;
//using System.Text.Json;
//using System.Text.Json.Serialization;
using System.Data;

namespace ConsoleTest
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var options = new RestClientOptions("https://dummy.restapiexample.com/api/v1/employees");
            var client = new RestClient(options);
            var request = new RestRequest("", Method.Get);
            var response = client.Execute(request);

            //if(response.StatusCode == System.Net.HttpStatusCode.OK)
            //{
            //    File.WriteAllText(@"C:\Users\байбатыровм\Desktop\employees.json", response.Content);
            //}

            DataTable dt = JsonConvert.DeserializeObject<DataTable>(response.Content);

            foreach (DataRow row in dt.Rows)
            {

            }


            #region работа с json
            //string json = File.ReadAllText(@"C:\Users\байбатыровм\Desktop\json_sample_2.json");
            //DataTable dt = JsonConvert.DeserializeObject<DataTable>(json);
            //foreach (DataRow row in dt.Rows)
            //{
            //    Console.WriteLine($"{row[0].ToString()}  {row[1].ToString()}");                
            //}

            //Rootobject result = JsonConvert.DeserializeObject<Rootobject>(json);

            //foreach (DataArray item in result.Data)
            //{
            //    Console.WriteLine($"{item.name}  {item.language}");
            //}

            //result.Name = result.Name + "___123";

            //string json2 = JsonConvert.SerializeObject(result, Formatting.Indented);
            //File.WriteAllText(@"C:\Users\байбатыровм\Desktop\json_sample_2_222.json", json2);


            //string st = @"{
            //                'id': 1,
            //                'name': 'step'
            //            }";

            ////st =        "{\"id\": 1,\"name\": 'step'}";

            ////dynamic ob = JObject.Parse(st);
            ////Console.WriteLine(ob.id);
            ////Console.WriteLine(ob.name);

            //st = @"[
            //            {
            //                'id': 1,
            //                'name': 'step1'
            //            },
            //            {
            //                'id': 2,
            //                'name': 'step2'
            //            },
            //            {
            //                'id': 3,
            //                'name': 'step3'
            //            }
            //       ]";
            //var array = JArray.Parse(st);
            //foreach (var item in array)
            //{
            //    Console.WriteLine($"{item["id"].ToString()} {item["name"].ToString()} ");
            //}
            #endregion
        }
    }
}
