using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MyAuth.Models
{
    public class Users
    {
        public int Id { get; set; }
        public string Login { get; set; }
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }

    public class UsersValidateRequest
    {
        public string Login { get; set; }
        public string Password { get; set; }
    }


    public class UsersValidateResponse
    {
        public Status Status { get; set; }
        public string Error { get; set; }
        public string Result { get; set; }
    }

    public enum Status
    {
        OK = 1,
        ERROR = 0,
        CRITICAL_ERROR = 2
    }

}