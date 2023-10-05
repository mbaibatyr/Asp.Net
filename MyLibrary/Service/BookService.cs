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
            throw new NotImplementedException();
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
