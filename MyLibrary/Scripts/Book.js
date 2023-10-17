$(document).ready(function () {
    $("#btTest").click(function () {
        $.ajax
            ({
                type: "GET",                
                url: "http://localhost:5064/Book/AuthorSelect",
                success: function (data) {
                    $("#cbAuthor").empty();
                    for (let i = 0; i < data.length; i++) {
                        $("#cbAuthor").append('<option value=' + data[i].id + '>' + data[i].name + '</option >');
                    };
                },
                error: function () {
                    console.log("error")
                }
            });

        $.ajax
            ({
                type: "GET",
                url: "http://localhost:5064/Book/CategorySelect",
                success: function (data) {
                    $("#cbCategory").empty();
                    for (let i = 0; i < data.length; i++) {
                        $("#cbCategory").append('<option value=' + data[i].id + '>' + data[i].name + '</option >');
                    };
                },
                error: function () {
                    console.log("error")
                }
            });


        let html;
        $("#tableBook").html('');

        html += "<table>";
        html += "<tr>";
        html += "<td>id</td><td>name</td>";
        html += "</tr>";
        html += "<tr>";
        html += "<td>1</td><td>Astana</td>";
        html += "</tr>";
        html += "</table>";
        $("#tableBook").html(html);
    });
});