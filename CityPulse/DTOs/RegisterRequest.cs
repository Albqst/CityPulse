namespace CityPulse.DTOs;

public record RegisterRequest(
    string Email,
    string Password,
    DateTime DateOfBirth);