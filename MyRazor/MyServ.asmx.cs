using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace MyRazor
{
    /// <summary>
    /// Summary description for MyServ
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class MyServ : System.Web.Services.WebService
    {
        //[ScriptMethod(UseHttpGet = true)]
        [WebMethod]
        public string HelloWorld(string name)
        {
            return "Hello " + name;
        }
    }
}
