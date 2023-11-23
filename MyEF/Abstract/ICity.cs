using MyEF.Model;

namespace MyEF.Abstract
{
    public interface ICity
    {
        IEnumerable<City> getAll();
        string add(City model);
    }
}
