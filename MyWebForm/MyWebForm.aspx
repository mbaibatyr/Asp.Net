<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MyWebForm.aspx.cs" Inherits="MyWebForm.MyWebForm" %>

<%@ Register Assembly="System.Web.DataVisualization, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" Namespace="System.Web.UI.DataVisualization.Charting" TagPrefix="asp" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <table border="1">
                <tr>
                    <td style="background-color: #FF0000; width: 100px;">
                        <asp:Button ID="Button1" runat="server" Text="Button" /></td>
                    <td>
                        <asp:Button ID="Button2" runat="server" Text="Button" OnClick="Button2_Click" /></td>
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
            <asp:HyperLink ID="HyperLink1" runat="server" NavigateUrl="~/About.aspx" Target="_blank">About</asp:HyperLink>
            <asp:Table ID="Table1" runat="server"></asp:Table>  
            <asp:GridView ID="GridView1" runat="server">
            </asp:GridView>
        </div>
        <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ErrorMessage="RequiredFieldValidator" ControlToValidate="TextBox1" ForeColor="#FF5050">Поле не заполнено</asp:RequiredFieldValidator>
        <asp:Button ID="Button3" runat="server" Text="Button" OnClick="Button3_Click" />
        <input id="Text1" type="text" />

    </form>
</body>
</html>
