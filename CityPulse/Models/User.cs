using Microsoft.AspNetCore.Identity;

namespace CityPulse.Models;

public class User : IdentityUser<int>
{
    public DateTime DateOfBirth { get; set; }
}