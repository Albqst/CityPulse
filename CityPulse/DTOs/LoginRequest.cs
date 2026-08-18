namespace CityPulse.DTOs;

public record LoginRequest(
    string Email,
    string Password);