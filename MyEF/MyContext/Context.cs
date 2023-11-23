using Microsoft.EntityFrameworkCore;
using MyEF.Model;

namespace MyEF.MyContext
{
    public class Context : DbContext
    {
        public DbSet<City> City { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=223-P;Database=EF_CORE;Trusted_Connection=True;");
        }
    }
}
