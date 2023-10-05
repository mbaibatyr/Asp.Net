namespace MyLibrary.Model
{
    public class ResultStatus
    {
        public string result { get; set; }
        public StatusEnum status { get; set; }
        public string error { get; set; }
    }

    public enum StatusEnum
    {
        OK = 1,
        ERROR = 0
    }
}
