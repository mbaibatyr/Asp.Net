$(document).ready(function () {
    //$("#btFill").click(function () {
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
    //});

    $("#btFind").click(function () {
        var title = $("#tbTitle").val() == '' ? 'all' : $("#tbTitle").val();

        let html = '';
        //$("#tableBook").html('');
        html += "<table border='1' cellpadding='1' cellspacing='1' width='500'>";
        html += "<tr bgcolor='#ffd400'>";
        html += "<td class='text-center'>id</td>"
        html += "<td class='text-center'>title</td>";
        html += "<td class='text-center'>year</td>";
        html += "<td class='text-center'>fio</td>";
        html += "<td class='text-center'>category_name</td>";
        html += "<td class='text-center'>delete</td>";
        html += "<td class='text-center'>edit</td>";
        html += "</tr>";
        //html += "</table>";

        $.ajax
            ({
                type: "GET",
                url: "http://localhost:5064/Book/BookGetAll/" + title,
                success: function (data) {
                    $.each(data, function (i, item) {
                        var del = "<button onclick='del(" + item.id + ")'>Delete</button>";
                        var edit = "<button onclick='edit(" + item.id + ")'>Edit</button>";
                        html += "<tr><td>" + item.id + "</td>" +
                            "<td>" + item.title + "</td>" +
                            "<td>" + item.year + "</td>" +
                            "<td>" + item.fio + "</td>" +
                            "<td>" + item.category_name + "</td>" +
                            "<td>" + del + "</td>" +
                            "<td>" + edit + "</td></tr>";
                    });
                    /*
                     
                     
                     */
                    html += "</table >";
                    //console.log(html);
                    $("#tableBook").html(html);
                },
                error: function () {
                    console.log("error")
                }
            });
    });

    $("#btEdit").click(function () {

        var MyData = {
            "id": $("#book_id").val(),
            "title": $("#title").val(),
            "author_id": $("#cbAuthor").val(),
            "year": $("#year").val(),
            "category_id": $("#cbCategory").val()
        };

        console.log(MyData);

        $.ajax
            ({
                type: "POST",
                headers: {                    
                    'Content-Type': 'application/json'
                },
                url: "http://localhost:5064/Book/BookAddOrEdit",
                data: JSON.stringify(MyData),                
                success: function (data) {
                    alert(data.result);
                },
                error: function () {
                    console.log("error")
                }
            });


    });
    

   
});


function del(id) {
    $.confirm({
        title: 'Are you sure to delete book!',
        content: 'Deletion!',
        buttons: {
            confirm: function () {
                //$.alert('go to delete');

            },
            cancel: function () {
                //$.alert('cancel delete!');
            }
        }
    });
}

function edit(id) {    
    $.ajax
        ({
            type: "GET",
            url: "http://localhost:5064/Book/BookGetById/" + id,
            success: function (data) {
                //console.log(data);
                $("#title").val(data.title);
                $("#year").val(data.year);

                $("#cbAuthor").val(data.author_id);
                $("#cbCategory").val(data.category_id);

                $("#book_id").val(data.id);
                
            },
            error: function () {
                console.log("error")
            }
        });
    $("#myModal").modal("show");
}


function refreshBook() {
    $("#myModal").modal("show");
}
function Edit2() {
    $("#myModal").modal("hide");
    var MyData = {
        "id": $("#book_id").val(),
        "title": $("#title").val(),
        "author_id": $("#cbAuthor").val(),
        "year": $("#year").val(),
        "category_id": $("#cbCategory").val()
    };

    $.ajax
        ({
            type: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            url: "http://localhost:5064/Book/BookAddOrEdit",
            data: JSON.stringify(MyData),
            success: function (data) {
                alert(data.result);
            },
            error: function () {
                console.log("error")
            }
        });

};


/*
 
 create proc pBookGetAll
@title nvarchar(100)
as
if @title = '' or @title is null or @title = 'all'
    select	b.id,
            b.title,
            b.year,
            ISNULL(a.first_name, ' ') + ISNULL(a.last_name, ' ') fio,
            c.name category_name
    from Book b join Author a on a.id = b.author_id
    join Category c on c.id = b.category_id
    order by b.title
else
    select	b.id,
            b.title,
            b.year,
            ISNULL(a.first_name, ' ') + ISNULL(a.last_name, ' ') fio,
            c.name category_name
    from Book b join Author a on a.id = b.author_id
    join Category c on c.id = b.category_id
    where b.title like '%' + @title + '%'
    order by b.title



CREATE proc pBookAddOrEdit --4, N'test2', 1,  2000, 1
@id          INT,
@title       NVARCHAR (200),
@author_id   INT,
@year        INT,
@category_id INT
as
    if @id = 0
        begin
            if exists(
                        select * from Book
                        where title = @title
                        and author_id = @author_id
                        )
                            begin 
                                select 'exists'
                                return
                            end 
            insert into Book
            (title, author_id, [year], category_id)
            values
            (@title, @author_id, @year, @category_id)
            select 'ok'
        end
    else
        begin
            update Book
                set title = @title, 
                author_id = @author_id, 
                [year] = @year, 
                category_id = @category_id
            where id = @id
            --@@rowcount
            select 'ok'
        end
 */