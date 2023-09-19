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
}