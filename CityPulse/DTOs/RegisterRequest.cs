namespace CityPulse.DTOs;

public record RegisterRequest(
    string Email,
    string Password,
    DateOnly DateOfBirth);