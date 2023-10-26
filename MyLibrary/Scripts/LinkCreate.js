var index;

$(window).on("load", function () {
    $('#wait').show();
    var api_url = "http://localhost:51804/key/getFolders";
    $.ajax
        ({
            type: "GET",
            url: api_url,
            success: function (data) {
                $('#wait').hide();
                $("#Select1").empty();
                $("#FolderMonitoringClassic").empty();
                $("#FolderMonitoringClassic").append('<option value=0>Folder:All</option >');
                $.each(data, function (idx, val) {
                    var id = val;
                    $("#Select1").append('<option value=' + idx + '>' + id + '</option >');
                    $("#FolderMonitoringClassic").append('<option value=' + idx + '>' + id + '</option >');
                });
                $("#Select1").trigger("change");
            },
            error: function () {
                console.log("error")
            }
        });
    var api_url = "http://localhost:51804/key/getUsers";
    /*$("#User").empty();*/
    $("#Author2").empty();
    $.ajax
        ({
            type: "GET",
            url: api_url,
            success: function (data) {
                $("#UserMonitoringClassic").empty();
                $("#UserMonitoringClassic").append('<option value=0>User:All</option >');
                $.each(data, function (i, Name) {
                    /*$("#User").append('<option value=' + data[i].Id + '>' + data[i].Name + '</option >');*/
                    $("#UserMonitoringClassic").append('<option value=' + data[i].Id + '>' + data[i].Name + '</option >');
                    $("#UserFaulted").append('<option value=' + data[i].Id + '>' + data[i].Name + '</option >');
                    $("#Author2").append('<option value=' + data[i].Id + '>' + data[i].Name + '</option >');
                });
            },
            error: function () {
                console.log("error")
            }
        });

    //var api_url = "http://localhost:51804/key/getSupport";
    //$("#User").empty();
    //$.ajax
    //    ({
    //        type: "GET",
    //        url: api_url,
    //        success: function (data) {
    //            $("#getSupport").html("Support group: " + data);
    //        },
    //        error: function () {
    //            console.log("error")
    //        }
    //    });

    $("#getSupport").html("<a href='msteams:/l/chat/0/0?users=asakhan@beeline.kz&message=Привет Асет'><img src='../Content/Smile.png' title='Teams chat with Aset'/></a>&nbsp; <a href='msteams:/l/call/0/0?users=asakhan@beeline.kz'><img src='../Content/Dial.png' title='Teams call to Aset'/></a>&nbsp; <a href='mailto:asakhan@beeline.kz'><img src='../Content/Mail.png' title='Outlok mail to Aset'/></a> &nbsp; <a href='https://web.telegram.org/z/#?tgaddr=tg%3A%2F%2Fresolve%3Fdomain%3DMUGIWARAWO' target='_blank'><img src='../Content/Telegram.png' title='Telegram chat with Aset'/></a> &nbsp; <a href='https://web.whatsapp.com/send?phone=77073234204&text=Привет&type=phone_number&app_absent=0' target='_blank'><img src='../Content/Whatsapp.png' title='WhatsApp chat with Aset'/></a> &nbsp;Support: Monkey D.LUFFY - Асет - 8 777 088 8877 - asakhan@beeline.kz");

    var api_url = "http://localhost:51804/key/getMachines";
    $.ajax
        ({
            type: "GET",
            url: api_url,
            success: function (data) {
                //console.log(data)
                $("#MachinesMonitoringClassic").empty();
                $("#MachinesMonitoringClassic").append('<option value=0>Machines:All</option >');
                $.each(data, function (i, Name) {
                    $("#MachinesMonitoringClassic").append('<option value=' + data[i].Id + '>' + data[i].Name + '</option >');
                });
            },
            error: function () {
                console.log("error")
            }
        });

    var api_url = "http://localhost:51804/key/getServers/";
    //$("#Servers").empty();    
    $("#ServersOrgUnits").empty();
    $("#ServersOrgUnits").append('<option value=0>Machines:All</option >');
    $.ajax
        ({
            type: "GET",
            url: api_url,
            dataType: "json",
            success: function (data) {
                $.each(data, function (i, Name) {
                    $("#Servers").append('<option value=' + data[i].Name + '>' + data[i].Name + '</option >');
                    $("#ServersOrgUnits").append('<option value=' + data[i].Name + '>' + data[i].Name + '</option >');                    
                });
            },
            error: function () {
                return "error";
            }
        });

    $("#dtSupport").val(getDateTime());
    $("#divImgScreen").hide();
    window.oncontextmenu = (e) => {
        e.preventDefault();
    }
    index = 0;
});
$(function () {

    $("#Select1").change(function () {
        var Select1 = $("#Select1").val();
        $("#ResultWithout").val("");
        $("#ResultWith").val("");
        $("#ResultMonitoring").val("");
        $("#LogMonitoring").val("");
        $("#ResultQueue").val("");
        $('#wait').show();
        var api_url = "http://localhost:51804/key/getRealease/" + Select1;
        $.ajax
            ({
                type: "GET",
                url: api_url,
                success: function (data) {
                    $('#wait').hide();
                    $("#Select2").empty();
                    $.each(data, function (idx, val) {
                        var id = val;
                        $("#Select2").append('<option value=' + idx + '>' + id + '</option >');
                    });
                    var Select2 = $("#Select2").val();
                    var Select2name = $("#Select2").find('option:selected').text();
                    $("#ResultWithout").val("http://al-rps001:8088/orch/start_job/" + Select1 + "/" + Select2);
                    $("#ResultWith").val("http://al-rps001:8088/orch/start_job_with_params/" + Select1);
                    $("#ResultMonitoring").val("http://al-rps001:8088/api/job_info/" + Select2name + "/10/");
                    $("#LogMonitoring").val("http://al-rps001:8088/api/log_info/" + Select2name + "/100");
                    $("#ResultQueue").val("http://al-rps001:8088/orch/start_job_via_queue/" + Select1);
                },
                error: function () {
                    console.log("error")
                }
            });

    });
    $("#Select2").change(function () {
        var Select1 = $("#Select1").val();
        var Select2 = $("#Select2").val();
        var Select2name = $("#Select2").find('option:selected').text();
        $("#ResultWithout").val("http://al-rps001:8088/orch/start_job/" + Select1 + "/" + Select2);
        $("#ResultWith").val("http://al-rps001:8088/orch/start_job_with_params/" + Select1);
        $("#ResultMonitoring").val("http://al-rps001:8088/api/job_info/" + Select2name + "/10/");
        $("#LogMonitoring").val("http://al-rps001:8088/api/log_info/" + Select2name + "/100");
        $("#ResultQueue").val("http://al-rps001:8088/orch/start_job_via_queue/" + Select1);
    });
    $('#Refresh').click(function () {
        location.reload();
    });

    $('#Refresh2').click(function () {
        $("#Servers").trigger("change");
    });

    $('#SampleWithParam').click(function () {
        var Select2 = $("#Select2").val();
        var result = "<pre STYLE='font-weight:bold'>{<br>";
        result += "     \"ReleaseKey\":\"" + Select2 + "\",<br>";
        result += "     \"Json\": [<br>";
        result += "         {<br>";
        result += "             \"Key\":\"sLogin\",<br>";
        result += "             \"Value\":\"Robotpasha\"<br>"
        result += "         },<br>";
        result += "         {<br>";
        result += "             \"Key\":\"sText\",<br>";
        result += "             \"Value\":\"hello world\"<br>";
        result += "         }<br>";
        result += "     ]<br>";
        result += "}<br></pre>";
        $.alert({
            title: 'Sample json body for starting robot with parameters',
            icon: 'fa fa-warning',
            type: 'orange',
            content: result
        });
    });
    $('#SampleWithQueue').click(function () {
        var result = "<pre STYLE='font-weight:bold'>{<br>";
        result += "     \"Name\":\"Q_TEST\",<br>";
        result += "     \"Priority\":\"Normal\",<br>";
        result += "     \"SpecificContent\": [<br>";
        result += "         {<br>";
        result += "             \"Key\":\"Param1\",<br>";
        result += "             \"Value\":\"1234567890\"<br>"
        result += "         },<br>";
        result += "         {<br>";
        result += "             \"Key\":\"Param2\",<br>";
        result += "             \"Value\":\"hello world\"<br>";
        result += "         }<br>";
        result += "     ]<br>";
        result += "}<br></pre>";
        $.alert({
            title: 'Sample json body for starting robot through Queue',
            icon: 'fa fa-warning',
            type: 'orange',
            content: result
        });
    });

    $("#Servers").change(function () {
        var server = $("#Servers").val();
        $('#wait2').show();
        $('#Refresh2').hide();
        $("#Content").html(null);
        var api_url = "http://localhost:51804/comon/serv_check/" + server;
        $.ajax
            ({
                type: "GET",
                url: api_url,
                success: function (data) {
                    $('#wait2').hide();
                    $('#Refresh2').show();
                    var st = data;
                    $("#Content").html(st);
                },
                error: function () {
                    console.log("error")
                }
            });

    });
    $("#Refresh3").click(function () {
        /*$('#datatable tbody > tr').empty();*/
        index = 500;
        var trHTML = "<table id='datatable' border='1' cellpadding='1' cellspacing='1' width='700' style='font-family: Calibri;'>";
        trHTML += "<thead>";
        trHTML += "<tr bgcolor='#ffd400'>";
        trHTML += "<th class='text-center'>Server</th>";
        trHTML += "<th class='text-center'>Process - User - Time - JiraStatus</th>";
        trHTML += "<th class='text-center'>Stop</th>";
        trHTML += "<th class='text-center'>Kill</th>";
        trHTML += "<th class='text-center'>Rest</th>";
        trHTML += "<th class='text-center'>Info</th>";
        trHTML += "<th class='text-center'>Scr</th>";
        trHTML += "</tr>";
        trHTML += "</thead>";
        trHTML += "<tbody>";
        $('#wait3').show();
        $('#Refresh3').hide();
        $("#divImgScreen").hide();
        $("#ContentLength").text('');
        $('#ContentPendingProcess').show();
        imgScreen.setAttribute('src', "");
        $.ajax({
            type: "GET",
            url: "http://localhost:51804/key/getProcesses",
            dataType: "json",
            success: function (data) {
                //http://al-rps001:8088/orch/stop_job/{JobId}/{OrgId}/{Strategy}
                $.each(data, function (i, item) {
                    var Name = item.Name == null ? "" : item.Name;
                    var ProcessUser = item.ProcessUser == null ? "" : item.ProcessUser;
                    var Process = item.ProcessUser == null ? "" : item.ProcessUser.split(' ')[0];
                    var LinkReboot = "http://localhost:51804/key/restart/" + Name.replace('+', '');
                    if (item.JobId != null) {
                        var LinkStop = "http://al-rps001:8088/orch/stop_job/" + item.JobId + "/" + item.OrgUnitId + "/SoftStop";
                        var LinkKill = "http://al-rps001:8088/orch/stop_job/" + item.JobId + "/" + item.OrgUnitId + "/Kill";
                        if (item.Sort == 0)
                            trHTML += "<tr><td><a href='http://al-rps001:8088/api/server_log/" + Name.replace('+', '') + "' target='_blank'>" + Name + "</a></td><td><a href='http://al-rps001:8088/api/log_info/" + Process + "/25' target='_blank' title='" + item.OrgUnitName + "' oncontextmenu='goOrk(\"" + item.OrkLink + "\")' >" + ProcessUser + "</a></td><td class='text-center'><a href=" + LinkStop + " target='_blank' onclick=\"return confirm('Stop this process?')\"><img src='../Content/Stop.png' title='Stop process'></a></td><td class='text-center'><a href=" + LinkKill + " target='_blank' onclick=\"return confirm('Kill the process??')\"><img src='../Content/Erase.png' title='Kill process'></a></td><td class='text-center'><a href=" + LinkReboot + " target='_blank' onclick=\"return confirm('Restart thie server " + Name.replace('+', '') + "?')\"><img src='../Content/Restart.png' title='Restart server'></a></td><td class='text-center'><a onclick='getInfo(\"" + item.Name.replace('+', '') + "\")'><img src='../Content/Info.png' title='Server status'></a></td><td class='text-center'><a oncontextmenu='getScreen3(\"" + item.Name.replace('+', '') + "\")' onclick='getScreen(\"" + item.Name.replace('+', '') + "\")'><img src='../Content/Screen.png' title='Show SreenShot'></a></td></tr> ";
                        else
                            trHTML += "<tr><td><b>" + Name + "</b></td><td></td><td></td><td></td><td class='text-center'><a href=" + LinkReboot + " target='_blank' onclick=\"return confirm('Restsrt this server " + Name + "?')\"><img src='../Content/Restart.png' title='Restart server'></a></td><td class='text-center'><a onclick='getInfo(\"" + item.Name + "\")'><img src='../Content/Info.png' title='Server status'></a></td><td></td></tr> ";
                    }
                    else {
                        if (item.Sort == 0)
                            trHTML += "<tr><td><a href='http://al-rps001:8088/api/server_log/" + Name.replace('+', '') + "' target='_blank'>" + Name + "</a></td><td>" + ProcessUser + "</td><td></td><td></td><td class='text-center'><a href=" + LinkReboot + " target='_blank' onclick=\"return confirm('Restart this server " + Name.replace('+', '') + "?')\"><img src='../Content/Restart.png' title='Restart server'></a></td><td class='text-center'><a onclick='getInfo(\"" + item.Name.replace('+', '') + "\")'><img src='../Content/Info.png' title='Server status'></a></td><td></td></tr>";
                        else {
                            if (ProcessUser == "")
                                trHTML += "<tr><td><b>" + Name + "</b></td><td>" + ProcessUser + "</td><td></td><td></td><td class='text-center'><a href=" + LinkReboot + " target='_blank' onclick=\"return confirm('Restart this server " + Name + "?')\"><img src='../Content/Restart.png' title='Restart server'></a></td><td class='text-center'><a onclick='getInfo(\"" + item.Name + "\")'><img src='../Content/Info.png' title='Server status'></a></td><td></td></tr>";
                            else
                                trHTML += "<tr><td><b>" + Name + "</b></td><td>" + ProcessUser + "</td><td></td><td></td><td class='text-center'><a href=" + LinkReboot + " target='_blank' onclick=\"return confirm('Restart this server " + Name + "?')\"><img src='../Content/Restart.png' title='Restart server'></a></td><td class='text-center'><a onclick='getInfo(\"" + item.Name + "\")'><img src='../Content/Info.png' title='Server status'></a></td><td class='text-center'><a oncontextmenu='getScreen3(\"" + item.Name.replace('+', '') + "\")' onclick='getScreen(\"" + item.Name.replace('+', '') + "\")'><img src='../Content/Screen.png' title='Show SreenShot'></a></td></tr>";
                        }
                    }
                });
                trHTML += "</tbody>";
                trHTML += "</table >";
                $('#Refresh3').show();
                $('#wait3').hide();
                $("#Content2").html(trHTML);
            },
            error: function () {
                console.log("error");
            }
        });

    });

    $("#User").change(function () {
        var User = $("#User").val();
        $("#Content3").html("");
        var api_url = "http://localhost:51804/key/getProcessesByUser/" + User;
        $.ajax
            ({
                type: "GET",
                url: api_url,
                success: function (data) {
                    $('#wait').hide();
                    $("#UserProcess").empty();
                    $.each(data, function (i, val) {
                        var id = val;
                        $("#UserProcess").append('<option value=' + data[i].Name + '>' + data[i].Name + '</option >');
                    });
                },
                error: function () {
                    console.log("error")
                }
            });
    });
    $("#UserProcess").change(function () {
        getJobLogByProcess();
        getLogByProcess();
    });

    $('#RefreshUserProcess').click(function () {
        $("#UserProcess").trigger("change");
    });

    $('#RefreshPendingProcess').click(function () {
        getPendingProcess();
    });
    $('#InputPartName').on('input', function (e) {
        var InputPartName = $("#InputPartName").val();
        if (InputPartName.length > 2) {
            getSearchProcessByPartName();
        }
        else
            $("#ContentPartName").html("");
    });
    $('#InputPartNameTrigger').on('input', function (e) {
        var InputPartName = $("#InputPartNameTrigger").val();
        if (InputPartName.length > 2) {
            getSearchTriggerByProcessName();
        }
        else
            $("#ContentPartNameTrigger").html("");
    });
    $('#RefreshMonitoringClassic').click(function () {
        /*$("#PageNum").val("1");*/
        getClassic();
    });
    $("#UserMonitoringClassic").change(function () {
        $("#PageNum").val("1");
        getClassic();
    });
    $("#StateMonitoringClassic").change(function () {
        $("#PageNum").val("1");
        getClassic();
    });
    $("#FolderMonitoringClassic").change(function () {
        $("#PageNum").val("1");
        getClassic();
    });
    $("#MachinesMonitoringClassic").change(function () {
        $("#PageNum").val("1");
        getClassic();
    });
    $("#IntervalMonitoringClassic").change(function () {
        $("#PageNum").val("1");
        getClassic();
    });

    $("#Prev").click(function () {
        var PageNum = parseInt($("#PageNum").val(), 10);
        PageNum = PageNum - 1;
        if (PageNum == 0)
            PageNum = 1;
        $("#PageNum").val(PageNum);
        getClassic();
    });

    $("#Next").click(function () {
        var PageNum = parseInt($("#PageNum").val(), 10);
        PageNum = PageNum + 1;
        $("#PageNum").val(PageNum);
        getClassic();
    });
    $('#PageNum').on('input', function (e) {
        var PageNum = parseInt($("#PageNum").val(), 10);
        if (PageNum > 0) {
            getClassic();
        }
    });
    $('#InputPartProcessName').on('input', function (e) {
        $("#PageNum").val("1");
        getClassic();
    });
    $('#RefreshSupport').click(function () {
        getSupport();
    });

    $("#datatable tr").click(function () {
        $(this).addClass('selected').siblings().removeClass('selected');
        var value = $(this).find('td:first').html();
        alert(value);
    });
    $("#ServersOrgUnits").change(function () {
        getOrgUnitMachines();
    });
});

function getJobLogByProcess() {
    var UserProcess = $("#UserProcess").val();
    if (UserProcess == "") {
        alert("UserProcess не выбран");
        return;
    }
    var api_url = "http://localhost:51804/key/getJobLogByProcess/" + UserProcess;
    $('#waitRefreshUserProcess').show();
    $('#RefreshUserProcess').hide();
    var trHTML = "";
    $.ajax
        ({
            type: "GET",
            url: api_url,
            success: function (data) {
                //console.log(data)
                trHTML += "<table id='datatable' border='1' cellpadding='1' cellspacing='1' width='500' style='font-family: Calibri;'>";
                trHTML += "<thead>";
                trHTML += "<tr bgcolor='#ffd400'>";
                trHTML += "<th>StartTime</th>";
                trHTML += "<th>EndTime</th>";
                trHTML += "<th>Job log</th>";
                trHTML += "<th>Server</th>";
                trHTML += "</tr>";
                trHTML += "</thead>";
                trHTML += "<tbody>";
                $.each(data, function (i, item) {
                    trHTML += "<tr><td>" + item.StartTime + "</td>" +
                        "<td>" + item.EndTime + "</td>" +
                        "<td>" + item.Info + "</td>" +
                        "<td>" + item.HostMachineName + "</td></tr>";
                });
                trHTML += "</tbody>";
                trHTML += "</table >";
                $("#ContentJobLog").html(trHTML);
                $('#RefreshUserProcess').show();
                $('#waitRefreshUserProcess').hide();
            },
            error: function () {
                console.log("error")
            }
        });
};

function getLogByProcess() {
    var UserProcess = $("#UserProcess").val();
    if (UserProcess == "") {
        alert("UserProcess не выбран");
        return;
    }
    var api_url = "http://localhost:51804/key/getLogByProcess/" + UserProcess;
    $('#waitRefreshUserProcess').show();
    $('#RefreshUserProcess').hide();
    var trHTML = "";
    $.ajax
        ({
            type: "GET",
            url: api_url,
            success: function (data) {
                //console.log(data)
                trHTML += "<table id='datatable' border='1' cellpadding='1' cellspacing='1' width='500' style='font-family: Calibri;'>";
                trHTML += "<thead>";
                trHTML += "<tr bgcolor='#ffd400'>";
                trHTML += "<th>TimeStamp</th>";
                trHTML += "<th>Process log</th>";
                trHTML += "<th>Server</th>";
                trHTML += "</tr>";
                trHTML += "</thead>";
                trHTML += "<tbody>";
                $.each(data, function (i, item) {
                    trHTML += "<tr><td>" + item.TimeStamp + "</td>" +
                        "<td>" + item.Message + "</td>" +
                        "<td>" + item.HostMachineName + "</td></tr>";
                });
                trHTML += "</tbody>";
                trHTML += "</table >";
                $("#ContentLogByProcess").html(trHTML);
                $('#RefreshUserProcess').show();
                $('#waitRefreshUserProcess').hide();
            },
            error: function () {
                console.log("error")
            }
        });
};

function getPendingProcess() {
    var api_url = "http://localhost:51804/key/getPendingProcess/";
    index = 500;
    $('#waitRefreshPendingProcess').show();
    $('#RefreshPendingProcess').hide();
    $("#divImgScreen").hide();
    $("#ContentLength").text('');
    $("#ContentPendingProcess").show();
    var trHTML = "";
    $.ajax
        ({
            type: "GET",
            url: api_url,
            success: function (data) {
                //console.log(data)
                trHTML += "<table id='datatable3' border='1' cellpadding='1' cellspacing='1' width='650' style='font-family: Calibri;'>";
                trHTML += "<thead>";
                trHTML += "<tr bgcolor='#ffd400'>";
                trHTML += "<th class='text-center'>Process</th>";
                trHTML += "<th class='text-center'>Status</th>";
                trHTML += "<th class='text-center'>User</th>";
                trHTML += "<th class='text-center'>Time</th>";
                trHTML += "<th class='text-center'>Delay</th>";
                trHTML += "<th class='text-center'>OrgUnit</th>";
                trHTML += "<th class='text-center'>Kill</th>";
                trHTML += "</tr>";
                trHTML += "</thead>";
                trHTML += "<tbody>";
                $.each(data, function (i, item) {
                    if (item.JobId != null) {
                        var LinkKill = "http://al-rps001:8088/orch/stop_job/" + item.JobId + "/" + item.OrgUnitId + "/Kill";
                        var ForKill = "<a href=" + LinkKill + " target='_blank' onclick=\"return confirm('Kill this process?')\"><img src='../Content/Erase.png' title='Kill process'></a>";
                    }

                    trHTML += "<tr><td>" + item.ProcessName + "</td>" +
                        "<td>" + item.Status + "</td>" +
                        "<td>" + item.UserName + "</td>" +
                        "<td>" + item.CreationTime + "</td>" +
                        "<td style='color:red;'>" + item.DelayTime + "</td>" +
                        "<td>" + item.OrgUnitName + "</td>" +
                        "<td>" + ForKill + "</td></tr>";
                });
                trHTML += "</tbody>";
                trHTML += "</table >";
                $("#ContentPendingProcess").html(trHTML);
                $('#RefreshPendingProcess').show();
                $('#waitRefreshPendingProcess').hide();
            },
            error: function () {
                console.log("error")
            }
        });
};

function getSearchProcessByPartName() {
    var InputPartName = $("#InputPartName").val();
    if (InputPartName == "") {
        alert("Критерий не выбран");
        return;
    }
    var api_url = "http://localhost:51804/key/getSearchProcessByPartName/" + InputPartName;
    var trHTML = "";
    $.ajax
        ({
            type: "GET",
            url: api_url,
            success: function (data) {
                //console.log(data)
                trHTML += "<table id='datatable3' border='1' cellpadding='1' cellspacing='1' width='600' style='font-family: Calibri;'>";
                trHTML += "<thead>";
                trHTML += "<tr bgcolor='#ffd400'>";
                trHTML += "<th>ProcessName___OrgUnit___User</th>";
                trHTML += "<th>LinkStart</th>";
                trHTML += "<th>LinkProcessLog</th>";
                trHTML += "<th>LinkJobLog</th>";
                trHTML += "</tr>";
                trHTML += "</thead>";
                trHTML += "<tbody>";
                $.each(data, function (i, item) {
                    trHTML += "<tr><td>" + item.Name + "</td>" +
                        "<td><a href='" + item.LinkStart + "' target='_blank' onclick=\"return confirm('Запустить этот процесс?')\">Start</a></td>" +
                        "<td><a href='" + item.LinkProcessLog + "' target='_blank'>Process Log</a></td>" +
                        "<td><a href='" + item.LinkJobLog + "' target='_blank'>Job Log</a></td></tr>";
                });
                trHTML += "</tbody>";
                trHTML += "</table >";
                $("#ContentPartName").html(trHTML);
            },
            error: function () {
                console.log("error")
            }
        });
};

function getSearchTriggerByProcessName() {
    var InputPartName = $("#InputPartNameTrigger").val();
    if (InputPartName == "") {
        alert("Критерий не выбран");
        return;
    }
    var api_url = "http://localhost:51804/key/getSearchTriggerByProcessName/" + InputPartName;
    var trHTML = "";
    $.ajax
        ({
            type: "GET",
            url: api_url,
            success: function (data) {
                //console.log(data)
                trHTML += "<table id='datatable3' border='1' cellpadding='1' cellspacing='1' width='600' style='font-family: Calibri;'>";
                trHTML += "<thead>";
                trHTML += "<tr bgcolor='#ffd400'>";
                trHTML += "<th>Trigger for ProcessName___OrgUnit___User</th>";
                trHTML += "<th>Status</th>";
                trHTML += "<th>Action</th>";
                trHTML += "</tr>";
                trHTML += "</thead>";
                trHTML += "<tbody>";
                $.each(data, function (i, item) {
                    var Status = "";
                    if (item.Status == "Switched ON")
                        Status = "<input type='button' value='Disable' onclick='changeStatusTrigger(" + item.Id + ", 0);' />";
                    else
                        Status = "<input type='button' value='Enable' onclick='changeStatusTrigger(" + item.Id + ", 1);' />";
                    trHTML += "<tr><td>" + item.Name + "</td>" +
                        "<td>" + item.Status + "</td>" +
                        "<td>" + Status + "</td></tr>";
                });
                trHTML += "</tbody>";
                trHTML += "</table >";
                $("#ContentPartNameTrigger").html(trHTML);
            },
            error: function () {
                console.log("error")
            }
        });
};

function changeStatusTrigger(Id, Status) {
    var api_url = "http://localhost:51804/key/changeStatusTrigger/" + Id + "/" + Status;
    var trHTML = "";
    $.ajax
        ({
            type: "GET",
            url: api_url,
            success: function (data) {
                alert("Data updated: " + data);
                getSearchTriggerByProcessName();
            },
            error: function () {
                console.log("error")
            }
        });
};

function getConfluenceLink(Process) {
    var api_url = "http://localhost:51804/key/getConfluenceLink/" + Process;
    $.ajax
        ({
            type: "GET",
            url: api_url,
            success: function (data) {
                console.log(data);
                if (data == null) {
                    alert("Не найдено сопоставление по номеру в Confluence")
                }
                else {
                    window.open(data, '_blank');
                }
            },
            error: function () {
                console.log("error")
            }
        });
};

function getJiraLink(Process) {
    var api_url = "http://localhost:51804/key/getJiraLink/" + Process;
    $.ajax
        ({
            type: "GET",
            url: api_url,
            success: function (data) {
                console.log(data);
                if (data == null) {
                    alert("Не найдено сопоставление по номеру в Jira")
                }
                else {
                    window.open(data, '_blank');
                }
            },
            error: function () {
                console.log("error")
            }
        });
};

function MyAlertInfo(Text, Title) {
    $.alert({
        title: Title,
        icon: 'fa fa-info',
        type: 'orange',
        content: '<span style="font-family: Calibri;">' + Text + '</span>',
    });
};

function AddComment(Process) {
    $("#myModal").modal("show");
    $("#ProcessName").val(Process);
    $("#Issue").val("");
    $("#Solution").val("");
    $("#Author").val("");
};

function AddComment2(Id, Process) {
    var api_url = "http://localhost:51804/key/getSupportById/" + Id;
    $.ajax
        ({
            type: "GET",
            url: api_url,
            async: false,
            success: function (data) {
                $("#Solution2").val(data.SupportSolution);
                $("#Author2").val(data.SupportName);
                $("#Sla").val(data.Sla);
            },
            error: function () {
                console.log("error")
            }
        });
    $("#myModal2").modal("show");
    $("#hSupportId").val(Id);
    $("#ProcessName2").val(Process);
};

function GetComment(Process) {
    window.location.href = "http://localhost:51804/key/getProcessHistory/" + Process;
    //getProcessHistory(Process)
    //$.ajax
    //    ({
    //        type: "GET",
    //        url: "http://localhost:51804/key/getProcessHistory" + Process,
    //        success: function (data) {                
    //        },
    //        error: function () {
    //            console.log("error")
    //        }
    //    });
};

function HideComment() {
    $("#myModal").modal("hide");
    var ProcessName = $("#ProcessName").val();
    var Issue = $("#Issue").val();
    var Solution = $("#Solution").val();
    var Author = $("#Author").val();

    var MyData = {
        'ProcessName': ProcessName,
        'Issue': Issue,
        'Solution': Solution,
        'Author': Author
    };
    $.ajax
        ({
            type: "POST",
            url: "http://localhost:51804/key/addProcessHistory",
            data: MyData,
            success: function (data) {
            },
            error: function () {
                console.log("error")
            }
        });
};

function HideComment2() {
    $("#myModal2").modal("hide");
    var Solution = $("#Solution2").val();
    //var Author = $("#Author2 option:selected").text();
    var Author = $("#Author2").val();
    var Sla = $("#Sla").val();
    var Id = $("#hSupportId").val();

    var MyData = {
        'SupportSolution': Solution,
        'SupportName': Author,
        'Sla': Sla,
        'Id': Id
    };
    $.ajax
        ({
            type: "POST",
            async: false,
            url: "http://localhost:51804/key/addProcessHistory2",
            data: MyData,
            success: function (data) {
                getSupport();
            },
            error: function () {
                console.log("error")
            }
        });
};

function getFaulted() {
    window.location.href = "http://localhost:51804/key/getFaulted/";
};
function getSupportReport() {
    window.location.href = "http://localhost:51804/key/getSupportReport/";
}

function getClassic() {
    var api_url = "http://localhost:51804/key/getClassic/";
    $('#waitMonitoringClassic').show();
    $('#RefreshMonitoringClassic').hide();
    var UserMonitoringClassic = $("#UserMonitoringClassic").val();
    var StateMonitoringClassic = $("#StateMonitoringClassic").val();
    var FolderMonitoringClassic = $("#FolderMonitoringClassic").val();
    var IntervalMonitoringClassic = $("#IntervalMonitoringClassic").val();
    var MachinesMonitoringClassic = $("#MachinesMonitoringClassic").val();
    var PageNum = $("#PageNum").val();
    if (StateMonitoringClassic == 0)
        StateMonitoringClassic = null;
    var InputPartProcessName = $("#InputPartProcessName").val();
    var trHTML = "";
    var MyData = {
        'User': UserMonitoringClassic,
        'State': StateMonitoringClassic,
        'Folder': FolderMonitoringClassic,
        'Interval': IntervalMonitoringClassic,
        'PageNum': PageNum,
        'PartProcessName': InputPartProcessName,
        'Machine': MachinesMonitoringClassic
    };
    $.ajax
        ({
            type: "POST",
            url: api_url,
            data: MyData,
            success: function (data) {
                trHTML += "<table id='datatable44' border='1' cellpadding='1' cellspacing='1' width='100%' style='font-family: Calibri;'>";
                trHTML += "<thead>";
                trHTML += "<tr bgcolor='#ffd400'>";
                trHTML += "<th class='text-center'>#</th>";
                trHTML += "<th class='text-center'>Process</th>";
                trHTML += "<th class='text-center'>User</th>";
                trHTML += "<th class='text-center'>Machine</th>";
                trHTML += "<th class='text-center'>State</th>";
                trHTML += "<th class='text-center'>Priority</th>";
                trHTML += "<th class='text-center'>Started</th>";
                trHTML += "<th class='text-center'>Ended</th>";
                trHTML += "<th class='text-center'>Folder</th>";
                trHTML += "<th class='text-center'>JiraStatus</th>";
                trHTML += "<th class='text-center'>#</th>";
                trHTML += "</tr>";
                trHTML += "</thead>";
                trHTML += "<tbody>";
                var JiraStatus, Info, Priority, State, Ended;
                $.each(data, function (i, item) {
                    if (item.Ended != null)
                        Ended = item.Ended;
                    else
                        Ended = "";
                    if (item.JiraStatus != null) {
                        if (item.JiraStatus.startsWith("Completed"))
                            JiraStatus = "<td>" + item.JiraStatus + "</td>";
                        else
                            JiraStatus = "<td bgcolor='paleturquoise'>" + item.JiraStatus + "</td>";
                    }
                    else
                        JiraStatus = "<td></td>";
                    if (item.Info != null)
                        Info = item.Info.replace(/[&\/\\#^+()$~%.'":*?<>{}!@]/g, "");
                    if (item.State == "Pending")
                        State = "<td><img src='../Content/Pending.png'/>" + item.State + "</td>";
                    else if (item.State == "Success")
                        State = "<td><img src='../Content/Success.png'/>" + item.State + "</td>";
                    else if (item.State == "Cancelled")
                        State = "<td><img src='../Content/Cancelled.png'/>" + item.State + "</td>";
                    else if (item.State == "Faulted")
                        State = "<td><img src='../Content/Faulted.png'/>" + item.State + "</td>";
                    else if (item.State == "Running" || item.State == "Stopping")
                        State = "<td><img src='../Content/Running.png'/>" + item.State + "</td>";
                    else
                        State = "<td>" + item.State + "</td>";

                    if (item.Priority == "Normal")
                        Priority = "<td><img src='../Content/Normal.png'/>" + item.Priority + "</td>";
                    else if (item.Priority == "High")
                        Priority = "<td><img src='../Content/High.png'/>" + item.Priority + "</td>";
                    else
                        Priority = "<td>" + item.Priority + "</td>";

                    trHTML += "<tr><td>" + item.Num + "</td>" +
                        "<td>" + item.Process + "</td>" +
                        "<td>" + item.User + "</td>" +
                        "<td>" + item.Machine + "</td>" +
                        State +
                        Priority +
                        "<td>" + item.Started + "</td>" +
                        "<td>" + Ended + "</td>" +
                        "<td>" + item.Folder + "</td>" +
                        JiraStatus +
                        "<td><div class='dropdown'>" +
                        "<button type='button' class='dropdown-toggle' data-toggle='dropdown'><span class='caret'></span></button>" +
                        "<ul class='dropdown-menu dropdown-menu-right'>" +

                        "<li><a onclick='MyAlertInfo(`" + Info + "`, `" + item.Process + "`)' href='#'>Info</a></li>" +
                        "<li><a href='#' onclick='getConfluenceLink(`" + item.Process + "`)'>Go to Confluence</a></li>" +
                        "<li><a href='#' onclick='getJiraLink(`" + item.Process + "`)'>Go to Jira</a></li>" +
                        "<li><a href='http://al-rps001:8082/key/getLogByJobId/" + item.Id + " ' target='_blank'>Log</a></li>" +
                        "<li><a href='http://al-rps001:8088/api/log_info/" + item.Process + "/25' target='_blank'>Log total</a></li>" +
                        "<li><a href='" + item.LinkStart + "' target='_blank' onclick=\"return confirm('Запустить этот процесс?')\">Restart</a></li>" +
                        "<li><a href='" + item.LinkStopJob + "' target='_blank' onclick=\"return confirm('Остановить этот процесс?')\">Stop</a></li>" +
                        "<li><a href='" + item.LinkKillJob + "' target='_blank' onclick=\"return confirm('Убить этот процесс?')\">Kill</a></li>" +
                        "<li class='divider'/>" +
                        "<li><a onclick='AddComment(`" + item.Process + "`)' href='#'>Add comment</a></li>" +
                        "<li><a onclick='GetComment(`" + item.Process + "`)' href='#'>Get comment</a></li>" +
                        "</ul>" +
                        "</td></tr>";

                });
                trHTML += "</tbody>";
                trHTML += "</table >";
                $("#ContentMonitoringClassic").html(trHTML);
                $('#RefreshMonitoringClassic').show();
                $('#waitMonitoringClassic').hide();
            },
            error: function () {
                console.log("error")
            }
        });
};

function getInfo(serverName) {
    var api_url = "http://localhost:51804/comon/serv_check/" + serverName;
    $.ajax
        ({
            type: "GET",
            url: api_url,
            success: function (data) {
                $.alert({
                    title: 'Статус сервера ' + serverName,
                    /*                    width: 'auto',*/
                    icon: 'fa fa-info',
                    type: 'orange',
                    useBootstrap: false,
                    content: data,
                });
            },
            error: function () {
                console.log("error")
            }
        });


}

function getDateTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    if (month.toString().length == 1) {
        month = '0' + month;
    }
    if (day.toString().length == 1) {
        day = '0' + day;
    }
    var dateTime = year + '-' + month + '-' + day;
    return dateTime;
}

function getSupport() {
    var api_url = "http://localhost:51804/key/getSupport/";
    $('#waitRefreshSupport').show();
    $('#RefreshSupport').hide();
    var dtSupport = $("#dtSupport").val();
    var trHTML = "";
    var MyData = {
        'Date': dtSupport
    };
    $.ajax
        ({
            type: "POST",
            url: api_url,
            data: MyData,
            success: function (data) {
                trHTML += "<table id='datatable4456' border='1' cellpadding='1' cellspacing='1' width='100%'  style='font-family: Calibri;'>";
                trHTML += "<thead>";
                trHTML += "<tr bgcolor='#ffd400'>";
                trHTML += "<th class='text-center'>StartTime</th>";
                trHTML += "<th class='text-center'>EndTime</th>";
                trHTML += "<th class='text-center'>Process</th>";
                trHTML += "<th class='text-center'>Owner</th>";
                trHTML += "<th class='text-center'>Server</th>";
                trHTML += "<th class='text-center'>Ork link</th>";
                trHTML += "<th class='text-center'>Info</th>";
                trHTML += "<th class='text-center'>Name</th>";
                trHTML += "<th class='text-center'>Solution</th>";
                trHTML += "<th class='text-center'>DateTime</th>";
                trHTML += "<th class='text-center'>SLA</th>";
                trHTML += "<th class='text-center'>#</th>";
                trHTML += "</tr>";
                trHTML += "</thead>";
                trHTML += "<tbody>";
                var SupportSolutionDateTime = "";
                var Info = "";
                const htmlEntities = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&apos;"
                };
                $.each(data, function (i, item) {
                    if (item.SupportSolutionDateTime == null)
                        SupportSolutionDateTime = "";
                    else
                        SupportSolutionDateTime = item.SupportSolutionDateTime;
                    Info = item.Info.replace(/([&<>\"'])/g, match => htmlEntities[match]);
                    trHTML += "<tr><td>" + item.StartTime + "</td>" +
                        "<td>" + item.EndTime + "</td>" +
                        "<td>" + item.ProcessName + "</td>" +
                        "<td>" + item.ProcessOwner + "</td>" +
                        "<td>" + item.ServerName + "</td>" +
                        "<td><a href='" + item.OrkLink + "' target='_blank'>Алға</a></td>" +
                        "<td>" + Info + "</td>" +
                        "<td>" + item.SupportName + "</td>" +
                        "<td>" + item.SupportSolution + "</td>" +
                        "<td>" + SupportSolutionDateTime + "</td>" +
                        "<td>" + item.SLA + "</td>" +
                        "<td><a onclick='AddComment2(`" + item.Id + "`, `" + item.ProcessName + "`)'>Comment</a></td>" +
                        "</tr>";

                });
                trHTML += "</tbody>";
                trHTML += "</table >";
                $("#ContentRefreshSupport").html(trHTML);
                $('#RefreshSupport').show();
                $('#waitRefreshSupport').hide();
            },
            error: function () {
                console.log("error")
            }
        });
}
function niceBytes(x) {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0, n = parseInt(x, 10) || 0;
    while (n >= 1024 && ++l) {
        n = n / 1024;
    }
    return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}

function getScreen(serverName) {
    $("#ContentLength").text('')
    index = 500;
    var api_url = "http://localhost:51804/key/getScreen/" + serverName + "/screen/";
    $.ajax
        ({
            type: "GET",
            url: api_url,
            //async: false,
            success: function (data) {
                if (data == null) {
                    $.alert({
                        title: 'Error by attempt get screenshot',
                        icon: 'fa fa-warning',
                        type: 'orange',
                        content: "Probably process finished or socket server switched off"
                    });
                    $("#divImgScreen").hide();
                    $("#ContentLength").text('');
                    imgScreen.setAttribute('src', "");
                    return;
                }
                $("#ContentLength").text("Server: " + serverName + "; Screen size: " + niceBytes(data.length));
                $("#divImgScreen").show();
                $("#ContentPendingProcess").slideUp();
                imgScreen.setAttribute('src', data);
            },
            error: function () {
                console.log("error")
            }
        });
    //setTimeout(function () {
    //    getScreen(serverName)
    //}, 3000);
}

function getScreen2(serverName) {
    index++;
    //console.warn(index);
    if (index > 180) {
        alert("Movie is over!");
        index = 0;
        return;
    }
    $("#ContentLength").text('')
    var api_url = "http://localhost:51804/key/getScreen/" + serverName + "/screen/";
    $.ajax
        ({
            type: "GET",
            url: api_url,
            //async: false,
            success: function (data) {
                if (data == null) {
                    $.alert({
                        title: 'Error by attempt get screenshot',
                        icon: 'fa fa-warning',
                        type: 'orange',
                        content: "Probably process finished or socket server switched off"
                    });
                    $("#divImgScreen").hide();
                    $("#ContentLength").text('');
                    imgScreen.setAttribute('src', "");
                    index = 0;
                    return;
                }
                const diff = new Date((180 - index) * 1000).toISOString().slice(14, 19);
                $("#ContentLength").text("Server: " + serverName + "; Screen size: " + niceBytes(data.length) + "; Time left : " + diff);
                $("#divImgScreen").show();
                $("#ContentPendingProcess").slideUp();
                imgScreen.setAttribute('src', data);
            },
            error: function () {
                console.log("error")
            }
        });
    setTimeout(function () {
        getScreen2(serverName)
    }, 1000);
}

function getScreen3(serverName) {
    if (index > 0 && index <= 180) {
        alert("Movie is not over yet!")
        return;
    }
    index = 0;
    getScreen2(serverName);
}

function goOrk(OrkLink) {
    window.open(OrkLink, '_blank');
}

function getOrgUnitMachines() {
    $('#wait_btnOrgUnits').show();
    $('#btnOrgUnits').hide();
    var ServersOrgUnits = $("#ServersOrgUnits").val();
    var api_url = "http://localhost:51804/key/getOrgUnitMachines/" + ServersOrgUnits;
    var trHTML = "";
    $.ajax
        ({
            type: "GET",
            url: api_url,
            success: function (data) {
                console.log(data)
                trHTML += "<table id='dtOrgUnitMachines' border='1' cellpadding='1' cellspacing='1' width='650' style='font-family: Calibri;'>";
                trHTML += "<thead>";
                trHTML += "<tr bgcolor='#ffd400'>";
                trHTML += "<th class='text-center'>OrgUnit</th>";
                trHTML += "<th class='text-center'>Machines</th>";
                trHTML += "</tr>";
                trHTML += "</thead>";
                trHTML += "<tbody>";
                $.each(data, function (i, item) {
                    trHTML += "<tr><td>" + item.OrgUnit + "</td>" +
                        "<td>" + item.Server + "</td></tr>";
                });
                trHTML += "</tbody>";
                trHTML += "</table >";
                $("#OrgUnitsContent").html(trHTML);
                $('#wait_btnOrgUnits').hide();
                $('#btnOrgUnits').show();
            },
            error: function () {
                console.log("error")
            }
        });

};