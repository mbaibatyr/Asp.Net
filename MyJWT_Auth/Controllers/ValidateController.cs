﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MyJWT_Auth.Model;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using Dapper;
using System.Security.Claims;

namespace MyJWT_Auth.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class ValidateController : ControllerBase
    {
        IConfiguration configuration;

        public ValidateController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }


        [AllowAnonymous]
        [HttpPost, Route("GetToken")]
        public ActionResult GetToken(UserModel model)
        {
            using (SqlConnection db = new SqlConnection(@"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=C:\Users\байбатыровм\Documents\testDB.mdf;Integrated Security=True;Connect Timeout=30"))
            {
                DynamicParameters p = new DynamicParameters(model);
                int count = db.ExecuteScalar<int>("pUserValidate", p, commandType:CommandType.StoredProcedure);
                if (count == 0)
                    return Unauthorized("Гуляй Вася");
            }           


            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                  var claims = new[] {
                      new Claim("role", "admin,report1,editor"),
                      new Claim("dateBirth", "2000-01-01")
            //    new Claim(JwtRegisteredClaimNames.Sub, userInfo.Username),
            //    new Claim(JwtRegisteredClaimNames.Email, userInfo.EmailAddress),
            //    new Claim("DateOfJoing", userInfo.DateOfJoing.ToString("yyyy-MM-dd")),
            //    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(configuration["Jwt:Issuer"],
                configuration["Jwt:Issuer"],
                //claims,
                null,
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: credentials);

            var sToken = new JwtSecurityTokenHandler().WriteToken(token);


            ReturnStatus result = new ReturnStatus()
            {
                status = StatusEnum.OK,
                result = sToken
            };
            return Ok(result);
        }
    }
}

/*
 
CREATE proc pUserValidate
@email varchar(500),
@psw nvarchar(100)
as
select count(*)
from users
where email = @email
and psw = @psw

*/
