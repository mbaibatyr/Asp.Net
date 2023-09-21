﻿using MyAuth.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyAuth.Abstract
{
    internal interface IUsers
    {
        UsersValidateResponse UsersValidate(UsersValidateRequest request);

        UsersValidateResponse UsersRegistration(UsersValidateRequest request);
    }
}
