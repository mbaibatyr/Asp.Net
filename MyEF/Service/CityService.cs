using Microsoft.EntityFrameworkCore;
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
            var city = getCityByName(model.Name);
            if (city != null)
                return "exists";
            db.City.Add(model);
            db.SaveChanges();
            return "ok";
        }

        public string edit(City model)
        {
            //var city = db.City.Find(model.Id);
            //city.Name = model.Name;
            //if(city != null)
            //{
            //db.City.Update(city);
            //    db.SaveChanges();
            //}
            

            db.Entry(model).State = EntityState.Modified;
            db.SaveChanges();
            return "ok";
        }

        public IEnumerable<City> getAll()
        {
            return db.City.ToList();
        }

        public City getCityById(int id)
        {
            return db.City.Find(id);
        }

        public City getCityByName(string name)
        {
            //return db.City.Where(z => z.Name == name).FirstOrDefault();
            //return db.City.FirstOrDefault(z => z.Name == name);
            return (from p in db.City
                    where p.Name == name
                    select p).FirstOrDefault();
        }
    }
}
