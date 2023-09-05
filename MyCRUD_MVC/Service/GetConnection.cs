using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace MyCRUD_MVC.Service
{
    public class GetConnection
    {
        protected SqlConnection getConn
        {
            get
            {
                return new SqlConnection(ConfigurationManager.AppSettings["db"]);
            }
        }
    }
}