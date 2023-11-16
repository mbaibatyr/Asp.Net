using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyJWT_Auth.Model;

namespace MyJWT_Auth.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ValidateController : ControllerBase
    {
        public ActionResult GetToken(UserModel model)
        {



            ReturnStatus result = new ReturnStatus()
            {
                status = StatusEnum.OK,
                result = ""
            };
            return Ok(result);
        }
    }



}
