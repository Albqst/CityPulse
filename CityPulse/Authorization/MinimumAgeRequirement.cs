using Microsoft.AspNetCore.Authorization;

namespace CityPulse.Authorization;

public sealed class MinimumAgeRequirement(int minimumAge): IAuthorizationRequirement
{
    public int MinimumAge { get; } = minimumAge;
}