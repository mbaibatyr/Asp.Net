using MyAuth.Abstract;
using MyAuth.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Dapper;
using System.Data;

namespace MyAuth.Service
{
    public class UsersService : IUsers
    {
        public UsersValidateResponse UsersValidate(UsersValidateRequest request)
        {
            try
            {
                using (SqlConnection db = new SqlConnection(ConfigurationManager.AppSettings["db"]))
                {
                    DynamicParameters p = new DynamicParameters(request);
                    var result = db.Query<Users>("pUsersValidate", p, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    if (result == null)
                        return new UsersValidateResponse
                        {
                            Status = Status.ERROR,
                            Error = "not exists",
                            Result = "0"
                        };
                    return new UsersValidateResponse
                    {
                        Status = Status.OK,
                        Result = "1"
                    };
                }
            }
            catch (Exception err)
            {
                return new UsersValidateResponse
                {
                    Status = Status.ERROR,
                    Error = err.Message,
                    Result = "0"
                };
            }
        }
    }
}