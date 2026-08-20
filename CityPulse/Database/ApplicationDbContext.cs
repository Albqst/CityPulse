using CityPulse.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CityPulse.Database
{
    public class ApplicationDbContext : IdentityDbContext<User, IdentityRole<int>, int>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>()
                .Property(u => u.Id)
                .ValueGeneratedOnAdd();
        }

        // Если нужны свои таблицы — добавляй сюда:
        // public DbSet<Product> Products { get; set; }
    }
    

    public class ApplicationUser : IdentityUser
    {
        // Добавляй свои поля, если нужно:
        // public string Department { get; set; }
    }
}