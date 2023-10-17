using MyLibrary.Model;
using MyLibrary.ViewModel;

namespace MyLibrary.Abstract
{
    public interface IBook
    {
        IEnumerable<BookAuthorCategoryVM> BookGetAll(string title);
        ResultStatus BookAddOrEdit(Book book);
        ResultStatus BookDelete(string id);
        IEnumerable<ListSelect> AuthorSelect();
        IEnumerable<ListSelect> CategorySelect();
    }
}
