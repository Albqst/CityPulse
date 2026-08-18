using CityPulse.DTOs;
using CityPulse.Models;
using CityPulse.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CityPulse.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(
    JwtService jwtService,
    PasswordHasher<User> passwordHasher) : ControllerBase
{
    private static readonly List<User> Users = [];

    [HttpPost("register")]
    public IActionResult Register(RegisterRequest request)
    {
        if (Users.Any(x => x.Email == request.Email))
            return Conflict("User already exists.");

        var user = new User
        {
            Id = Users.Count + 1,
            Email = request.Email,
            DateOfBirth = request.DateOfBirth
        };

        user.PasswordHash =
            passwordHasher.HashPassword(
                user,
                request.Password);

        Users.Add(user);

        return Ok(new
        {
            user.Id,
            user.Email,
            user.DateOfBirth
        });
    }

    [HttpPost("login")]
    public IActionResult Login(LoginRequest request)
    {
        var user = Users.FirstOrDefault(
            x => x.Email == request.Email);

        if (user is null)
            return Unauthorized();

        var result = passwordHasher.VerifyHashedPassword(
            user,
            user.PasswordHash,
            request.Password);

        if (result == PasswordVerificationResult.Failed)
            return Unauthorized();

        var token = jwtService.GenerateToken(user);

        return Ok(new
        {
            accessToken = token
        });
    }
}