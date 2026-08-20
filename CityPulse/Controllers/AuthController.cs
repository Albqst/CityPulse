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
    PasswordHasher<User> passwordHasher,
    UserService userService) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        var existing = await userService.GetByEmailAsync(request.Email);
        if (existing is not null)
            return Conflict("User already exists.");

        var user = new User
        {
            Email = request.Email,
            UserName = request.Email,
            DateOfBirth = request.DateOfBirth
        };

        user.PasswordHash = passwordHasher.HashPassword(user, request.Password);

        await userService.CreateAsync(user);

        return Ok(new
        {
            user.Id,
            user.Email,
            user.DateOfBirth
        });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var user = await userService.GetByEmailAsync(request.Email);

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