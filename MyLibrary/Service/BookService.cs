using MyLibrary.Abstract;
using MyLibrary.Model;
using MyLibrary.ViewModel;
using System.Data;
using Dapper;

namespace MyLibrary.Service
{
    public class BookService : GetConnection, IBook
    {
        public BookService(IConfiguration configuration) : base(configuration)
        {
        }

        public IEnumerable<ListSelect> AuthorSelect()
        {
            using (var db = getConn)
            {
                return db.Query<ListSelect>("pAuthorSelect", commandType: CommandType.StoredProcedure);
            }
        }

        public ResultStatus BookAddOrEdit(Book book)
        {
            try
            {
                using (var db = getConn)
                {
                    DynamicParameters p = new DynamicParameters(book);
                    var result = db.ExecuteScalar<string>("pBookAddOrEdit", p, commandType: CommandType.StoredProcedure);
                    return new ResultStatus
                    {
                        status = StatusEnum.OK,
                        result = result
                    };
                }
            }
            catch (Exception err)
            {
                return new ResultStatus
                {
                    status = StatusEnum.ERROR,
                    result = err.Message
                };
            }
        }

        public ResultStatus BookDelete(string id)
        {
            try
            {
                using (var db = getConn)
                {
                    var result = db.Execute("pBookDelete", new { @id  = id}, commandType: CommandType.StoredProcedure);
                    return new ResultStatus
                    {
                        status = StatusEnum.OK,
                        result = "ok"
                    };
                }
            }
            catch (Exception err)
            {
                return new ResultStatus
                {
                    status = StatusEnum.ERROR,
                    result = err.Message
                };
            }
        }

        public IEnumerable<BookAuthorCategoryVM> BookGetAll(string title)
        {
            using (var db = getConn)
            {
                return db.Query<BookAuthorCategoryVM>("pBookGetAll", new { @title = title }, commandType: CommandType.StoredProcedure);
            }
        }

        public IEnumerable<ListSelect> CategorySelect()
        {
            using (var db = getConn)
            {
                return db.Query<ListSelect>("pCategorySelect", commandType: CommandType.StoredProcedure);
            }
        }
    }
}
