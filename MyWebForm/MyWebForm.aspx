<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MyWebForm.aspx.cs" Inherits="MyWebForm.MyWebForm" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <style type="text/css">
        .auto-style1 {
            width: 201px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <table border="1">
                <tr>
                    <td style="background-color: #FF0000; width: 100px;">
                        <asp:Button ID="Button1" runat="server" Text="Button" /></td>
                    <td>
                        <asp:Button ID="Button2" runat="server" Text="Button" /></td>
                </tr>
                <tr>
                    <td>
                        <asp:Calendar runat="server"
                            ID="Calendar1"
                            BackColor="White"
                            BorderColor="Black"
                            BorderStyle="Solid"
                            CellSpacing="1"
                            Font-Names="Verdana"
                            Font-Size="9pt"
                            ForeColor="Black"
                            Height="250px"
                            Width="500px"
                            NextPrevFormat="ShortMonth"
                            SelectionMode="Day" OnSelectionChanged="Calendar1_SelectionChanged">
                            <SelectedDayStyle BackColor="DarkOrange"
                                ForeColor="White" />
                            <DayStyle BackColor="Orange"
                                Font-Bold="True"
                                ForeColor="White" />
                            <NextPrevStyle Font-Bold="True"
                                Font-Size="8pt"
                                ForeColor="White" />
                            <DayHeaderStyle Font-Bold="True"
                                Font-Size="8pt"
                                ForeColor="#333333"
                                Height="8pt" />
                            <TitleStyle BackColor="Firebrick"
                                BorderStyle="None"
                                Font-Bold="True"
                                Font-Size="12pt"
                                ForeColor="White" Height="12pt" />
                            <OtherMonthDayStyle BackColor="NavajoWhite"
                                Font-Bold="False"
                                ForeColor="DarkGray" />
                        </asp:Calendar>
                    </td>
                    <td>
                        <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox></td>
                </tr>
            </table>
        </div>
    </form>
</body>
</html>
