let array = [
    {
        "id": "1",
        "name": "Almaty"
    },
    {
        "id": "2",
        "name": "Astana"
    },
]

$(document).ready(function () {

    $("#Select1").change(function () {
        var Select1 = $("#Select1").val();
        console.log($("#Select1").val());
        //console.log($("#Select1").text());
        //console.log($("#Select1").html());
        //alert(Select1);
    });

    $("#btTest").click(function () {    
        $("#Select1").empty();
        for (let i = 0; i < array.length; i++) {
            $("#Select1").append('<option value=' + array[i].id + '>' + array[i].name + '</option >');
        };
    });
});
