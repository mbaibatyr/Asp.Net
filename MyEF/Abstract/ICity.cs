using MyEF.Model;

namespace MyEF.Abstract
{
    public interface ICity
    {
        IEnumerable<City> getAll();
    }
}
