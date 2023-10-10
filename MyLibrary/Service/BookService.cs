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
            throw new NotImplementedException();
        }

        public IEnumerable<BookAuthorCategoryVM> BookGetAll(string title)
        {
            using (var db = getConn)
            {
                return db.Query<BookAuthorCategoryVM>("pBookGetAll", new { @title = title }, commandType: CommandType.StoredProcedure);
            }
        }
    }
}
