<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CRUD.aspx.cs" Inherits="MyWebForm.CRUD" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <style type="text/css">
        .auto-style1 {
            width: 300px;
        }

        .auto-style2 {
            height: 98px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <table border="1" class="auto-style2">
                <tr>
                    <td class="auto-style1">
                        <asp:Label ID="Label1" runat="server" Text="ИИН"></asp:Label>
                        &nbsp;&nbsp;
                        <asp:TextBox ID="tbIIN" runat="server" Width="180px"></asp:TextBox>
                        <asp:Button ID="btFind" runat="server" Text="Найти" Width="90px" OnClick="btFind_Click" />
                    </td>
                    <td class="auto-style1"></td>
                    <td class="auto-style1">
                        <asp:Button ID="Button1" runat="server" Text="EXCEL" OnClick="Button1_Click" />
                        <asp:Button ID="Button2" runat="server" Text="CSV" OnClick="Button2_Click" />
                    </td>
                </tr>
                <tr>
                    <td colspan="3" class="auto-style1">
                        <asp:GridView ID="GV" runat="server" CssClass="GridView_With_GridLines" DataKeyNames="id"
                            AllowPaging="True" BackColor="White" BorderColor="#3366CC" BorderStyle="None"
                            BorderWidth="1px" CellPadding="4" PageSize="21" AutoGenerateColumns="False">
                            <RowStyle BackColor="White" ForeColor="#003399" />
                            <SelectedRowStyle BackColor="#FFD789" BorderStyle="Groove" BorderWidth="2" />
                            <PagerSettings Position="TopAndBottom" />
                            <PagerStyle CssClass="cssPager" />
                            <Columns>
                                <asp:CommandField SelectText="Выбрать" ShowSelectButton="True">
                                    <HeaderStyle Wrap="True" Width="100" />
                                    <ItemStyle CssClass="GridView_HyperLink" Wrap="True" ForeColor="Red" />
                                    <ControlStyle Width="50px" />
                                </asp:CommandField>
                                <asp:BoundField DataField="id" HeaderText="№">
                                    <HeaderStyle HorizontalAlign="Center" />
                                    <ItemStyle HorizontalAlign="Left" VerticalAlign="Top" Width="50px" />
                                </asp:BoundField>
                                <asp:BoundField DataField="iin" HeaderText="ИИН">
                                    <HeaderStyle HorizontalAlign="Center" />
                                    <ItemStyle HorizontalAlign="Left" VerticalAlign="Top" Width="700px" />
                                </asp:BoundField>
                                <asp:BoundField DataField="lastName" HeaderText="Фамилия" />
                                <asp:BoundField DataField="firstName" HeaderText="Имя" />
                                <asp:BoundField DataField="dateBirth" HeaderText="Дата рождения" />
                                <asp:BoundField DataField="gender" HeaderText="Пол" />
                            </Columns>
                            <FooterStyle BackColor="#99CCCC" ForeColor="#003399" />
                            <HeaderStyle CssClass="GridView_With_GridLines_Header" ForeColor="#CCCCFF" HorizontalAlign="Left"
                                Wrap="False" BackColor="#003399" Font-Bold="True" />
                            <SortedAscendingCellStyle BackColor="#EDF6F6" />
                            <SortedAscendingHeaderStyle BackColor="#0D4AC4" />
                            <SortedDescendingCellStyle BackColor="#D6DFDF" />
                            <SortedDescendingHeaderStyle BackColor="#002876" />
                        </asp:GridView>

                    </td>
                </tr>
            </table>

        </div>
    </form>
</body>
</html>
