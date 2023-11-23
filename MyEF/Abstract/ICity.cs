using MyEF.Model;

namespace MyEF.Abstract
{
    public interface ICity
    {
        IEnumerable<City> getAll();
        string add(City model);
        City getCityById(int id);
        City getCityByName(string name);
        string edit(City model);
    }
}
