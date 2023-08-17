<%@ Page Title="About" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="About.aspx.cs" Inherits="MyWebForm.About" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><%: Title %>.</h2>
    <h3>Your application description page.</h3>
    <p>Use this area to provide additional information.</p>
    <asp:TextBox ID="tb1" runat="server"></asp:TextBox><br />
    <asp:TextBox ID="tb2" runat="server"></asp:TextBox><br />
    <asp:TextBox ID="tbResult" runat="server"></asp:TextBox>
    <asp:Button ID="btResult" runat="server" Text="Button" OnClick="btResult_Click" />
</asp:Content>
