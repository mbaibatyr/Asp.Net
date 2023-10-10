$(document).ready(function () {
    $("#btTest").click(function () {
        $.ajax
            ({
                type: "GET",
                url: "http://localhost:5064/Book/BookGetAll/all",
                success: function (data) {
                    console.log(data)
                },
                error: function () {
                    console.log("error")
                }
            });
    });
});