using MyCRUD_MVC.Abstract;
using MyCRUD_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dapper;
using System.Data.SqlClient;

namespace MyCRUD_MVC.Service
{
    public class CountryServiceDapper : ICountry
    {
        public Result CountryCreate(Country model)
        {
            throw new NotImplementedException();
        }

        public Result CountryDelete(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Country> CountryGetAll()
        {
            using (SqlConnection db = new SqlConnection())
            {

            }
        }

        public Country CountryGetById(int id)
        {
            throw new NotImplementedException();
        }

        public Result CountryUpdate(Country model)
        {
            throw new NotImplementedException();
        }
    }
}