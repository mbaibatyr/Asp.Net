using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MyWebForm
{
    public partial class MyWebForm : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Calendar1_SelectionChanged(object sender, EventArgs e)
        {
            TextBox1.Text = Calendar1.SelectedDate.ToString("dd.MM.yyyy");
        }

        protected void Button2_Click(object sender, EventArgs e)
        {
            TableRow row = new TableRow();
            TableCell cell = new TableCell();
            cell.Text = "blah blah blah";
            row.Cells.Add(cell);
            Table1.Rows.Add(row);

        }

        protected void Button3_Click(object sender, EventArgs e)
        {

        }
    }
}