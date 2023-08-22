using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MyWebForm
{
    public partial class CRUD : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }


        protected void fillGrid()
        {
            using (SqlConnection db = new SqlConnection(ConfigurationManager.AppSettings["db"]))
            {
                using (SqlCommand cmd = new SqlCommand("pStudentGetAll", db))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    if(string.IsNullOrEmpty(tbIIN.Text))
                }
            }
        }

        protected void btFind_Click(object sender, EventArgs e)
        {

        }
    }
}