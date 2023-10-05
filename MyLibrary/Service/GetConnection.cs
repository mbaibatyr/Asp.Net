using System.Data.SqlClient;
namespace MyLibrary.Service
{
    public class GetConnection
    {
        IConfiguration configuration;
        public GetConnection(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public SqlConnection getConn
        {
            get
            {
                return new SqlConnection(configuration["db"]);
            }
        }
    }
}
