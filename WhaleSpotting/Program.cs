using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using WhaleSpotting.Models.DbModels;

namespace WhaleSpotting
{
    public class Program
    {
        public async static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            
            using var scope = host.Services.CreateScope();
            var serviceProvider = scope.ServiceProvider;
            var dbContext = serviceProvider.GetService<WhaleSpottingContext>();

            try
            {
                var userManager = serviceProvider.GetRequiredService<UserManager<IdentityUser>>();
                var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
                await Seeding.DefaultRoles.SeedAsync(userManager, roleManager);
                await Seeding.DefaultUsers.SeedBasicUserAsync(userManager, roleManager);
                await Seeding.DefaultUsers.SeedAdminAsync(userManager, roleManager);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            dbContext!.Database.Migrate();
            
            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
    }
}