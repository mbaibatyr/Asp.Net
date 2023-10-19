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


        let html = '';
        //$("#tableBook").html('');
        html += "<table border='1' cellpadding='1' cellspacing='1' width='500'>";
        html += "<tr bgcolor='#ffd400'>";
        html += "<td class='text-center'>id</td>"
        html += "<td class='text-center'>title</td>";
        html += "<td class='text-center'>year</td>";
        html += "<td class='text-center'>fio</td>";
        html += "<td class='text-center'>category_name</td>";
        html += "</tr>";
        //html += "</table>";

        $.ajax
            ({
                type: "GET",
                url: "http://localhost:5064/Book/BookGetAll/all",
                success: function (data) {                                        
                    $.each(data, function (i, item) {
                        html += "<tr><td>" + item.id + "</td>" +
                                "<td>" + item.title + "</td></tr>";
                    });
                    html += "</table >";
                    //console.log(html);
                    $("#tableBook").html(html);
                },
                error: function () {
                    console.log("error")
                }
            });

        
    });
});

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