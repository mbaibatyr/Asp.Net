using Newtonsoft.Json;
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

        public static void Main()
        {
            JsonToDataTable();
        }        
    }    
}
    

