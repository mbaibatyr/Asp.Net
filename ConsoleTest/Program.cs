using ConsoleTest.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;
using System.Data;
using System.Data.SqlClient;
using Dapper;
using System.Text;

namespace ConsoleTest
{
    internal class Program
    {
        static void JsonSample()
        {
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

        static void GetSample()
        {
            //var options = new RestClientOptions("https://dummy.restapiexample.com/api/v1/employees");
            //var client = new RestClient(options);
            //var request = new RestRequest("", Method.Get);
            //var response = client.Execute(request);

            //if(response.StatusCode == System.Net.HttpStatusCode.OK)
            //{
            //    File.WriteAllText(@"C:\Users\байбатыровм\Desktop\employees.json", response.Content);
            //}

            string Content = File.ReadAllText(@"C:\Users\байбатыровм\Desktop\employees.json");

            //DataTable dt = JsonConvert.DeserializeObject<DataTable>(response.Content);
            //DataTable dt = JsonConvert.DeserializeObject<DataTable>(Content);

            RootEmployee result = JsonConvert.DeserializeObject<RootEmployee>(Content);

            using (SqlConnection db = new SqlConnection(@"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=C:\Users\байбатыровм\Documents\testDB.mdf;Integrated Security=True;Connect Timeout=30"))
            {
                string sql = "insert into Employees(employee_name, employee_salary) values('{0}', {1})";
                foreach (var item in result.data)
                {
                    db.Execute(string.Format(sql, item.employee_name, item.employee_salary));
                }
            }
        }

        static void PostSample()
        {
            var options = new RestClientOptions("https://dummy.restapiexample.com/api/v1/create");
            var client = new RestClient(options);
            var request = new RestRequest("", Method.Post);
            var req = new
            {
                name = "test",
                salary = "123",
                age = "23"
            };
            request.AddJsonBody(req);
            var response = client.Execute(request);
            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                RootPostResponse result = JsonConvert.DeserializeObject<RootPostResponse>(response.Content);
            }
            else
            {
                string Content = File.ReadAllText(@"C:\Users\байбатыровм\Desktop\json_sample_2.json");
                RootPostResponse result = JsonConvert.DeserializeObject<RootPostResponse>(Content);
            }

        }

        //public string DoEncrypt(string Text, string Key)
        //{
        //    if (string.IsNullOrEmpty(Text))
        //        return "";

        //    byte[] initialVectorBytes = Encoding.ASCII.GetBytes("16CHARSLONG12345");
        //    byte[] saltValueBytes = Encoding.ASCII.GetBytes("123456789");
        //    byte[] plainTextBytes = Encoding.UTF8.GetBytes(Text);

        //    PasswordDeriveBytes derivedPassword = new PasswordDeriveBytes(Key, saltValueBytes, "SHA1", 2);
        //    byte[] keyBytes = derivedPassword.GetBytes(256 / 8);
        //    RijndaelManaged symmetricKey = new RijndaelManaged();
        //    symmetricKey.Mode = CipherMode.CBC;

        //    byte[] cipherTextBytes = null;

        //    using (ICryptoTransform encryptor = symmetricKey.CreateEncryptor(keyBytes, initialVectorBytes))
        //    {
        //        using (MemoryStream memStream = new MemoryStream())
        //        {
        //            using (System.Security.Cryptography.CryptoStream cryptoStream = new CryptoStream(memStream, encryptor, CryptoStreamMode.Write))
        //            {
        //                cryptoStream.Write(plainTextBytes, 0, plainTextBytes.Length);
        //                cryptoStream.FlushFinalBlock();
        //                cipherTextBytes = memStream.ToArray();
        //                memStream.Close();
        //                cryptoStream.Close();
        //            }
        //        }
        //    }
        //    symmetricKey.Clear();
        //    return Convert.ToBase64String(cipherTextBytes);
        //}


        static string getToken()
        {
            var client = new RestClient();
            var request = new RestRequest("http://localhost:5243/Validate/GetToken", Method.Post);
            request.AddHeader("Content-Type", "application/json");
            var body = new
            {
                email = "admin",
                psw = "1234"
            };
            request.AddJsonBody(body);
            RestResponse response = client.Execute(request);
            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                dynamic json = JObject.Parse(response.Content);
                return json.result;
            }
            return null;
        }

        static void getData(string token)
        {
            var client = new RestClient();
            var request = new RestRequest("http://localhost:5243/WeatherForecast", Method.Get);
            request.AddHeader("Authorization", "Bearer " + token);
            RestResponse response = client.Execute(request);
            var jArray = JArray.Parse(response.Content);
            for (int i = 0; i < jArray.Count; i++)
            {
                Console.WriteLine(jArray[i].ToString());
            }
        }

        static void Main(string[] args)
        {
            var token = getToken();
            getData(token);
            
            

            //PostSample();

            //List<test> lst = new List<test>()
            //{
            //    new test(){ id="1", name = "111"},
            //    new test(){ id="2", name = "222"},
            //    new test(){ id="3", name = "333"}
            //};

            //StringBuilder sb = new StringBuilder();
            //sb.AppendLine("id;name");
            //foreach (var item in lst)
            //{
            //    sb.AppendLine($"{item.id};{item.name}");
            //}

            //var bytes = Encoding.UTF8.GetBytes(sb.ToString());

        }
    }

    public class test
    {
        public string id { get; set; }
        public string name { get; set; }
    }
}
