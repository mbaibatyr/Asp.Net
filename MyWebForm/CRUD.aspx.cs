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
                db.Open();
                using (SqlCommand cmd = new SqlCommand("pStudentGetAll", db))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    if(!string.IsNullOrEmpty(tbIIN.Text))
                    {
                        cmd.Parameters.AddWithValue("@iin", tbIIN.Text);
                    }
                    DataTable dt = new DataTable();
                    dt.Load(cmd.ExecuteReader());
                    GV.DataSource = dt;
                    GV.DataBind();
                }
                db.Close();
            }
        }

        protected void btFind_Click(object sender, EventArgs e)
        {
            fillGrid();
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            Response.Redirect("~/File.aspx?param1=excel");
        }

        protected void Button2_Click(object sender, EventArgs e)
        {
            Response.Redirect("~/File.aspx?param1=csv");
        }
    }
}