using Microsoft.AspNetCore.Identity;
using WhaleSpotting.Models.Enums;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace WhaleSpotting.Seeding
{
    public static class DefaultRoles
    {
        public static async Task SeedAsync(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            await roleManager.CreateAsync(new IdentityRole(Roles.Admin.ToString()));
            await roleManager.CreateAsync(new IdentityRole(Roles.Basic.ToString()));
        }
    }
}