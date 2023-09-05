using MyCRUD_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCRUD_MVC.Abstract
{
    internal interface ICountry
    {
        IEnumerable<Country> CountryGetAll();
        Country CountryGetById(int id);
        Result CountryCreate(Country model);
        Result CountryUpdate(Country model);
        Result CountryDelete(int id);
    }
}
