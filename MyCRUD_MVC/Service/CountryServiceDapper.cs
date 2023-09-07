using MyCRUD_MVC.Abstract;
using MyCRUD_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dapper;
using System.Data.SqlClient;
using System.Data;
using AutoMapper;

namespace MyCRUD_MVC.Service
{
    public class CountryServiceDapper : GetConnection, ICountry
    {
        public Result CountryCreate(Country model)
        {
            string error = null;
            string result = null;
            try
            {
                using (SqlConnection db = getConn)
                {
                    //DynamicParameters p = new DynamicParameters(model);
                    //var myModel = new
                    //{
                    //    name = model.name,
                    //    capital = model.capital,
                    //    population = model.population
                    //};

                    var config = new MapperConfiguration(cfg => cfg.CreateMap<Country, Country2>());
                    var mapper = new Mapper(config);
                    var myModel2 = mapper.Map<Country2>(model);

                    DynamicParameters p = new DynamicParameters(myModel2);
                    result = db.ExecuteScalar<string>("pCountryCreate", p, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception err)
            {
                error = err.Message;
            }
            return new Result
            {
                error = error,
                result = result,
                status = result == "ok" ? Status.OK : Status.ERROR
            };
        }

        public Result CountryDelete(int id)
        {
            using (SqlConnection db = getConn)
            {
                db.Execute("pCountryDelete", new { id = id }, commandType: CommandType.StoredProcedure);
                return new Result
                {
                    status = Status.OK,
                    result = "ok"
                };
            }
        }

        public IEnumerable<Country> CountryGetAll()
        {
            using (SqlConnection db = getConn)
            {
                return db.Query<Country>("pCountryGetAll", commandType: CommandType.StoredProcedure);
            }
        }

        public Country CountryGetById(int id)
        {
            using (SqlConnection db = getConn)
            {
                return db.Query<Country>("pCountryGetById", new { id = id }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
        }

        public Result CountryUpdate(Country model)
        {
            string error = null;
            string result = null;
            try
            {
                using (SqlConnection db = getConn)
                {
                    DynamicParameters p = new DynamicParameters(model);
                    db.Execute("pCountryUpdate", p, commandType: CommandType.StoredProcedure);
                    result = "ok";
                }
            }
            catch (Exception err)
            {
                error = err.Message;
            }
            return new Result
            {
                error = error,
                result = result,
                status = result == "ok" ? Status.OK : Status.ERROR
            };
        }
    }
}