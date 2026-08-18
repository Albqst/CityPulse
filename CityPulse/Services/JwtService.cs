using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CityPulse.Models;
using Microsoft.IdentityModel.Tokens;

namespace CityPulse.Services;

public class JwtService(IConfiguration configuration)
{
    public string GenerateToken(User user)
    {
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new(ClaimTypes.Email, user.Email),

            new(
                ClaimTypes.DateOfBirth,
                user.DateOfBirth.ToString("yyyy-MM-dd"))
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(
                configuration["Jwt:Key"]!));

        var credentials = new SigningCredentials(
            key,
            SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: configuration["Jwt:Issuer"],
            audience: configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler()
            .WriteToken(token);
    }
}