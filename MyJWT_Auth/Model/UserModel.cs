namespace MyJWT_Auth.Model
{
    public class UserModel
    {
        public string email { get; set; }
        public string psw { get; set; }
    }

    public class ReturnStatus
    {
        public string result { get; set; }
        public string error { get; set; }
        public StatusEnum status { get; set; }
    }

    public enum StatusEnum
    {
        OK = 1,
        ERROR = 0,
        CRITICAL_ERROR = -1
    }
}
