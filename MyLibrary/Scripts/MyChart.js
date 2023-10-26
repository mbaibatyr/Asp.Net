$(window).on("load", function () {
    var d = new Date(),
        n = d.getMonth(),
        y = d.getFullYear();
    $('#Month').val(("0" + (n + 1)).slice(-2));
    $('#Year').val(y);
    $('#tabs li a:not(:first)').addClass('inactive');
    $('.container').hide();
    $('.container:first').show();
});
$(function () {
    $('#tabs li a').click(function () {
        var t = $(this).attr('id');
        if ($(this).hasClass('inactive')) { //this is the start of our condition
            $('#tabs li a').addClass('inactive');
            $(this).removeClass('inactive');
            $('.container').hide();
            $('#' + t + 'C').fadeIn('slow');
            switch (t) {
                case 'tab1':
                    getMachines();
                    break;
                case 'tab2':
                    getDevelopers();
                    break;
                case 'tab3':
                    getDays();
                    break;
                case 'tab4':
                    getProcessCode();
                    break;
                case 'tab5':
                    getChartHoursInDay();
                    break;
                case 'tab6':
                    getChartMonthsInYear();
                    break;
                case 'tab7':
                    getChartFaulted();
                    break;
                case 'tab8':
                    getChartJiraStages();
                    break;
            }
            /*$("#RefreshChart1").trigger("click");*/
        }
    });

    $("#RefreshChart1").click(function () {
        if ($("#tab1").hasClass('inactive') == false)
            getMachines();
        else if ($("#tab2").hasClass('inactive') == false)
            getDevelopers();
        else if ($("#tab3").hasClass('inactive') == false)
            getDays();
        else if ($("#tab4").hasClass('inactive') == false)
            getProcessCode();
        else if ($("#tab5").hasClass('inactive') == false)
            getChartHoursInDay();
        else if ($("#tab6").hasClass('inactive') == false)
            getChartMonthsInYear();
        else if ($("#tab7").hasClass('inactive') == false)
            getChartFaulted();
        else if ($("#tab8").hasClass('inactive') == false) {
            getChartJiraStages();
            getChartOneProcess();
        }
    });

    $("#Month").change(function () {
        $("#RefreshChart1").trigger("click");
    });

    $("#Year").change(function () {
        $("#RefreshChart1").trigger("click");
    });
    $("#TypeChart").change(function () {
        $("#RefreshChart1").trigger("click");
    });
    $("#UserFaulted").change(function () {
        $("#RefreshChart1").trigger("click");
    });
    $('#ConflNumber').on('input', function (e) {
        FindRobotData();
        getChartOneProcess();
        getChartJiraStages();
    });
});

function getMachines() {
    var Month = $("#Month").val();
    var Year = $("#Year").val();
    var api_url = "http://localhost:51804/key/getChartMachines/" + Month + "/" + Year;
    $('#waitRefreshChart1').show();
    $('#RefreshChart1').hide();
    $.ajax
        ({
            type: "GET",
            url: api_url,
            success: function (data) {
                ChartMachines(data);
            },
            error: function () {
                return "error";
            }
        });
}
function getDevelopers() {
    var Month = $("#Month").val();
    var Year = $("#Year").val();
    var api_url = "http://localhost:51804/key/getChartUsers/" + Month + "/" + Year;
    $('#waitRefreshChart1').show();
    $('#RefreshChart1').hide();
    $.ajax
        ({
            type: "GET",
            url: api_url,
            success: function (data) {
                ChartDevelopers(data);
            },
            error: function () {
                return "error";
            }
        });
}
function getDays() {
    var Month = $("#Month").val();
    var Year = $("#Year").val();
    var api_url = "http://localhost:51804/key/getChartDaysInMonth/" + Month + "/" + Year;
    $('#waitRefreshChart1').show();
    $('#RefreshChart1').hide();
    $.ajax
        ({
            type: "GET",
            url: api_url,
            success: function (data) {
                ChartDays(data);
            },
            error: function () {
                return "error";
            }
        });
}
function getProcessCode() {
    var Month = $("#Month").val();
    var Year = $("#Year").val();
    var api_url = "http://localhost:51804/key/getChartProcessCode/" + Month + "/" + Year;
    $('#waitRefreshChart1').show();
    $('#RefreshChart1').hide();
    $.ajax
        ({
            type: "GET",
            url: api_url,
            success: function (data) {
                ChartProcessCode(data);
            },
            error: function () {
                return "error";
            }
        });
}
function getChartHoursInDay() {
    var Month = $("#Month").val();
    var Year = $("#Year").val();
    var api_url = "http://localhost:51804/key/getChartHoursInDay/" + Month + "/" + Year;
    $('#waitRefreshChart1').show();
    $('#RefreshChart1').hide();
    $.ajax
        ({
            type: "GET",
            url: api_url,
            success: function (data) {
                ChartHoursInDay(data);
            },
            error: function () {
                return "error";
            }
        });
}
function getChartMonthsInYear() {
    var Year = $("#Year").val();
    var api_url = "http://localhost:51804/key/getChartMonthsInYear/" + Year;
    $('#waitRefreshChart1').show();
    $('#RefreshChart1').hide();
    $.ajax
        ({
            type: "GET",
            url: api_url,
            success: function (data) {
                ChartMonthsInYear(data);
            },
            error: function () {
                return "error";
            }
        });
}
function getChartFaulted() {
    var Year = $("#Year").val();
    var Month = $("#Month").val();
    var UserFaulted = $("#UserFaulted").val();
    var api_url = "http://localhost:51804/key/getChartStatusByUser/" + Month + "/" + Year + "/" + UserFaulted;
    $('#waitRefreshChart1').show();
    $('#RefreshChart1').hide();
    $.ajax
        ({
            type: "GET",
            url: api_url,
            success: function (data) {
                ChartFaulted(data);
            },
            error: function () {
                return "error";
            }
        });
}
function ChartMachines(data) {
    var Month = $("#Month option:selected").text();
    var Year = $("#Year").val();
    var TypeChart = $("#TypeChart").val();
    var chart = new CanvasJS.Chart("ChartMachines", {
        animationEnabled: true,
        theme: "light1", // "light1", "light2", "dark1", "dark2"
        title: {
            text: "Machines resource consumption in " + Month + " - " + Year
        },
        axisY: {
            title: "Minutes"
        },
        data: [{
            type: TypeChart,
            showInLegend: TypeChart == "pie" || TypeChart == "doughnut" ? false : true,
            legendMarkerColor: "grey",
            legendText: "Machines",
            dataPoints: data
        }]
    });
    chart.render();
    $('#waitRefreshChart1').hide();
    $('#RefreshChart1').show();
    $("#TypeChart").prop("disabled", false);
}
function ChartDevelopers(data) {
    var Month = $("#Month option:selected").text();
    var Year = $("#Year").val();
    var TypeChart = $("#TypeChart").val();
    var chart = new CanvasJS.Chart("ChartDevelopers", {
        animationEnabled: true,
        theme: "light1", // "light1", "light2", "dark1", "dark2"
        title: {
            text: "Developers resource consumption in " + Month + " - " + Year
        },
        axisY: {
            title: "Minutes"
        },
        data: [{
            type: TypeChart,
            showInLegend: TypeChart == "pie" || TypeChart == "doughnut" ? false : true,
            legendMarkerColor: "grey",
            legendText: "Developers",
            dataPoints: data
        }]
    });
    chart.render();
    $('#waitRefreshChart1').hide();
    $('#RefreshChart1').show();
    $("#TypeChart").prop("disabled", false);
}
function ChartDays(data) {
    var Month = $("#Month option:selected").text();
    var Year = $("#Year").val();
    var TypeChart = $("#TypeChart").val();
    var chart = new CanvasJS.Chart("ChartDays", {
        animationEnabled: true,
        theme: "light1", // "light1", "light2", "dark1", "dark2"
        title: {
            text: "Days in month resource consumption in " + Month + " - " + Year
        },
        axisY: {
            title: "Minutes"
        },
        data: [{
            type: TypeChart,
            showInLegend: TypeChart == "pie" || TypeChart == "doughnut" ? false : true,
            legendMarkerColor: "grey",
            legendText: "Days",
            dataPoints: data
        }]
    });
    chart.render();
    $('#waitRefreshChart1').hide();
    $('#RefreshChart1').show();
    $("#TypeChart").prop("disabled", false);
}
function ChartProcessCode(data) {
    var Month = $("#Month option:selected").text();
    var Year = $("#Year").val();
    var TypeChart = $("#TypeChart").val();
    var chart = new CanvasJS.Chart("ChartProcessCode", {
        animationEnabled: true,
        theme: "light1", // "light1", "light2", "dark1", "dark2"
        title: {
            text: "Process resource consumption in " + Month + " - " + Year
        },
        axisY: {
            title: "Minutes"
        },
        data: [{
            type: TypeChart,
            toolTipContent: "{text} - {y} minutes",
            showInLegend: TypeChart == "pie" || TypeChart == "doughnut" ? false : true,
            legendMarkerColor: "grey",
            legendText: "Process codes",
            dataPoints: data
        }]
    });
    chart.render();
    $('#waitRefreshChart1').hide();
    $('#RefreshChart1').show();
    $("#TypeChart").prop("disabled", false);
}
function ChartHoursInDay(data) {
    var Month = $("#Month option:selected").text();
    var Year = $("#Year").val();
    var TypeChart = $("#TypeChart").val();
    var chart = new CanvasJS.Chart("ChartHoursInDay", {
        animationEnabled: true,
        theme: "light1", // "light1", "light2", "dark1", "dark2"
        title: {
            text: "Hours resource consumption in " + Month + " - " + Year
        },
        axisY: {
            title: "Quantity times started"
        },
        data: [{
            type: TypeChart,
            showInLegend: TypeChart == "pie" || TypeChart == "doughnut" ? false : true,
            legendMarkerColor: "grey",
            legendText: "Hours In Day",
            dataPoints: data
        }]
    });
    chart.render();
    $('#waitRefreshChart1').hide();
    $('#RefreshChart1').show();
    $("#TypeChart").prop("disabled", false);
}
function ChartMonthsInYear(data) {
    var Month = $("#Month option:selected").text();
    var Year = $("#Year").val();
    var TypeChart = $("#TypeChart").val();
    var chart = new CanvasJS.Chart("ChartMonthsInYear", {
        animationEnabled: true,
        theme: "light1", // "light1", "light2", "dark1", "dark2"
        title: {
            text: "Months In Year resource consumption in " + Year
        },
        axisY: {
            title: "Minutes"
        },
        data: [{
            type: TypeChart,
            /*            toolTipContent: "{text} - {y} minutes",*/
            showInLegend: TypeChart == "pie" || TypeChart == "doughnut" ? false : true,
            legendMarkerColor: "grey",
            legendText: "Months In Year",
            dataPoints: data
        }]
    });
    chart.render();
    $('#waitRefreshChart1').hide();
    $('#RefreshChart1').show();
    $("#TypeChart").prop("disabled", false);
}
function ChartFaulted(data) {
    var Month = $("#Month option:selected").text();
    var Year = $("#Year").val();
    var TypeChart = $("#TypeChart").val();
    var ChartWidth = $(window).width() - 50;

    try {
        var Items = data[0].dataPoints.length;

        if (Items < 15)
            ChartWidth = ChartWidth * 1;
        else if (Items >= 15 && Items < 30)
            ChartWidth = ChartWidth * 2;
        else if (Items >= 30 && Items < 45)
            ChartWidth = ChartWidth * 3;
        else ChartWidth = ChartWidth * 4;
    } catch (e) {

    }

    var chart = new CanvasJS.Chart("ChartFaulted", {
        animationEnabled: true,
        theme: "light1", //"light1", "dark1", "dark2"
        title: {
            text: "Statuses in " + Month + " - " + Year
        },
        width: ChartWidth,
        //axisY: {
        //    interval: 10
        //},
        toolTip: {
            shared: true
        },
        data: data
    });
    chart.render();
    $('#waitRefreshChart1').hide();
    $('#RefreshChart1').show();
    $("#TypeChart").prop("disabled", true);
}

function getChartJiraStages() {
    var ConflNumber = $("#ConflNumber").val();
    if (ConflNumber.length <= 2) {
        //alert("At least 3 symbols");
        //ChartJiraStages(null);
        return;
    }
    var api_url = "http://localhost:51804/key/getJiraByStage/" + ConflNumber;
    $.ajax
        ({
            type: "GET",
            url: api_url,
            success: function (data) {
                ChartJiraStages(data);
            },
            error: function () {
                return "error";
            }
        });
    getChartOneProcess();
}

function ChartJiraStages(data) {
    var TypeChart = $("#TypeChart").val();
    var chart = new CanvasJS.Chart("ChartJiraStages", {
        animationEnabled: true,
        theme: "light1", // "light1", "light2", "dark1", "dark2"
        title: {
            text: "Jira stages",
            fontSize: 30
        },
        axisY: {
            title: "Days"
        },
        data: [{
            type: TypeChart,
            showInLegend: TypeChart == "pie" || TypeChart == "doughnut" ? false : true,
            legendMarkerColor: "grey",
            legendText: "Jira activity",
            dataPoints: data
        }]
    });
    chart.render();
    $('#waitRefreshChart1').hide();
    $('#RefreshChart1').show();
    $("#TypeChart").prop("disabled", false);
}

function FindRobotData() {
    var ConflNumber = $("#ConflNumber").val();
    if (ConflNumber.length <= 2) {
        //alert("At least 3 symbols");
        $("#ConflName").html("");
        $("#ConflJiraStatus").html("");
        $("#ConflAuthor").html("");
        $("#ConfluenceName").html("");
        $("#JiraType").html("");
        $("#ConfluenceLink").html("");
        $("#GitLabLink").html("");
        $("#JiraLink").html("");
        return;
    }
    var api_url = "http://localhost:51804/key/getRobotData/" + ConflNumber;
    $.ajax
        ({
            type: "GET",
            url: api_url,
            success: function (data) {
                if (data != null) {
                    $("#ConflName").html(data[0].Name);
                    $("#ConflJiraStatus").html(data[0].JiraStatus);
                    $("#ConflAuthor").html(data[0].Author);
                    $("#ConfluenceName").html(data[0].ConfluenceName);
                    $("#JiraType").html(data[0].JiraType);
                    $("#ConfluenceLink").html("<a href='" + data[0].ConfluenceLink + "' target='_blank'>Confluence</a>");
                    $("#GitLabLink").html("<a href='" + data[0].GitLabLink + "' target='_blank'>GitLab</a>");
                    $("#JiraLink").html("<a href='https://jira.beeline.kz/browse/" + data[0].JiraKey + "' target='_blank'>Jira</a>");
                }
                else {
                    $("#ConflName").html("");
                    $("#ConflJiraStatus").html("");
                    $("#ConflAuthor").html("");
                    $("#ConfluenceName").html("");
                    $("#JiraType").html("");
                    $("#ConfluenceLink").html("");
                    $("#GitLabLink").html("");
                    $("#JiraLink").html("");

                }

            },
            error: function () {
                return "error";
            }
        });
}

function getChartOneProcess() {
    var ConflNumber = $("#ConflNumber").val();
    if (ConflNumber.length <= 2)
        return
    var Year = $("#Year").val();
    var Month = $("#Month").val();

    var api_url = "http://localhost:51804/key/getChartOneProcess/" + Month + "/" + Year + "/" + ConflNumber + "/1";
    $('#waitRefreshChart1').show();
    $('#RefreshChart1').hide();
    $.ajax
        ({
            type: "GET",
            url: api_url,
            success: function (data) {
                ChartOneProcess_1(data);
            },
            error: function () {
                return "error";
            }
        });
    api_url = "http://localhost:51804/key/getChartOneProcess/" + Month + "/" + Year + "/" + ConflNumber + "/2";
    $('#waitRefreshChart1').show();
    $('#RefreshChart1').hide();
    $.ajax
        ({
            type: "GET",
            url: api_url,
            success: function (data) {
                ChartOneProcess_2(data);
            },
            error: function () {
                return "error";
            }
        });
    api_url = "http://localhost:51804/key/getChartOneProcess/" + Month + "/" + Year + "/" + ConflNumber + "/3";
    $('#waitRefreshChart1').show();
    $('#RefreshChart1').hide();
    $.ajax
        ({
            type: "GET",
            url: api_url,
            success: function (data) {
                ChartOneProcess_3(data);
            },
            error: function () {
                return "error";
            }
        });

}

function ChartOneProcess_1(data) {
    var Month = $("#Month option:selected").text();
    var Year = $("#Year").val();
    var TypeChart = $("#TypeChart").val();
    var chart = new CanvasJS.Chart("ChartOneProcess_1", {
        animationEnabled: true,
        theme: "light1", // "light1", "light2", "dark1", "dark2"
        title: {
            text: "Machines resource consumption in " + Month + " - " + Year,
            fontSize: 30
        },
        axisY: {
            title: "Minutes"
        },
        data: [{
            type: TypeChart,
            showInLegend: TypeChart == "pie" || TypeChart == "doughnut" ? false : true,
            legendMarkerColor: "grey",
            legendText: "Machines",
            dataPoints: data
        }]
    });
    chart.render();
    //$('#waitRefreshChart1').hide();
    //$('#RefreshChart1').show();
    //$("#TypeChart").prop("disabled", false);
}

function ChartOneProcess_2(data) {
    var Month = $("#Month option:selected").text();
    var Year = $("#Year").val();
    var TypeChart = $("#TypeChart").val();
    var chart = new CanvasJS.Chart("ChartOneProcess_2", {
        animationEnabled: true,
        theme: "light1", // "light1", "light2", "dark1", "dark2"
        title: {
            text: "Days resource consumption in " + Month + " - " + Year,
            fontSize: 30
        },
        axisY: {
            title: "Minutes"
        },
        data: [{
            type: TypeChart,
            showInLegend: TypeChart == "pie" || TypeChart == "doughnut" ? false : true,
            legendMarkerColor: "grey",
            legendText: "Days",
            dataPoints: data
        }]
    });
    chart.render();
    //$('#waitRefreshChart1').hide();
    //$('#RefreshChart1').show();
    //$("#TypeChart").prop("disabled", false);
}

function ChartOneProcess_3(data) {
    var Month = $("#Month option:selected").text();
    var Year = $("#Year").val();
    var TypeChart = $("#TypeChart").val();
    var chart = new CanvasJS.Chart("ChartOneProcess_3", {
        animationEnabled: true,
        theme: "light1", // "light1", "light2", "dark1", "dark2"
        title: {
            text: "Hours resource consumption in " + Month + " - " + Year,
            fontSize: 30
        },
        axisY: {
            title: "Hours in day"
        },
        data: [{
            type: TypeChart,
            showInLegend: TypeChart == "pie" || TypeChart == "doughnut" ? false : true,
            legendMarkerColor: "grey",
            legendText: "Days",
            dataPoints: data
        }]
    });
    chart.render();
    $('#waitRefreshChart1').hide();
    $('#RefreshChart1').show();
    $("#TypeChart").prop("disabled", false);
}