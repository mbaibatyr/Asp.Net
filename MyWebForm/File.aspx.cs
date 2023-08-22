using ClosedXML.Excel;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MyWebForm
{
    public partial class File : System.Web.UI.Page
    {
        protected DataTable getData()
        {
            DataTable dt = new DataTable();
            using (SqlConnection db = new SqlConnection(ConfigurationManager.AppSettings["db"]))
            {
                db.Open();
                using (SqlCommand cmd = new SqlCommand("pStudentGetAll", db))
                {
                    cmd.CommandType = CommandType.StoredProcedure;                    
                    dt.Load(cmd.ExecuteReader());                    
                }
                db.Close();
                return dt;
            }
        }
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.QueryString["param1"] == "excel")
            {
                Response.Write(Request.QueryString["param1"].ToString());
                Response.Clear();
                Response.ContentType = "application/octet-stream";
                Response.AddHeader("Content-Disposition", string.Format("attachment; filename={0}", "report.xlsx"));

                using (XLWorkbook wb = new XLWorkbook())
                {                    
                    var ws = wb.AddWorksheet(getData(), "reportDB");
                    //ws.Cell(1, 1).Value = "Id";
                    //ws.Cell(1, 2).Value = "Name";
                    using (MemoryStream ms = new MemoryStream())
                    {
                        wb.SaveAs(ms);                        
                        Response.OutputStream.Write(ms.ToArray(), 0, (int)ms.Length);
                        Response.End();
                    }
                }
            }
            else
                  if (Request.QueryString["param1"] == "csv")
            {
                Response.Write(Request.QueryString["param1"].ToString());
                Response.Clear();
                Response.ContentType = "text/csv";
                Response.AddHeader("Content-Disposition", string.Format("attachment; filename={0}", "report.csv"));


                string st = "id;iin;lastName;firstName;dateBirth;gender" + Environment.NewLine;
                foreach (DataRow row in getData().Rows)
                {
                    st += $"{row[0].ToString()};{row[1].ToString()};{row[2].ToString()};{row[3].ToString()};{row[4].ToString()};{row[5].ToString()}" + Environment.NewLine;
                }
                
                
                using (MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(st)))
                {
                    //ms.CopyTo(Response.OutputStream);
                    Response.OutputStream.Write(ms.ToArray(), 0, (int)ms.Length);
                    Response.End();
                }

            }
        }
    }
}