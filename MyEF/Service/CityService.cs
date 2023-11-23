using MyEF.Abstract;
using MyEF.Model;
using MyEF.MyContext;

namespace MyEF.Service
{
    public class CityService : ICity
    {
        Context db;
        public CityService()
        {
            db = new Context();
        }

        public string add(City model)
        {
            db.City.Add(model);
            db.SaveChanges();
            return "ok";
        }

        public IEnumerable<City> getAll()
        {
            return db.City.ToList();
        }
    }
}
