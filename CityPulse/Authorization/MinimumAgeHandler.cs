using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace CityPulse.Authorization;

public sealed class MinimumAgeHandler : AuthorizationHandler<MinimumAgeRequirement>
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, MinimumAgeRequirement requirement)
    {
        var dateOfBirthClaim = context.User.FindFirst(
            ClaimTypes.DateOfBirth);

        if (dateOfBirthClaim is null)
            return Task.CompletedTask;

        if (!DateTime.TryParse(
                dateOfBirthClaim.Value,
                out var dateOfBirth))
        {
            return Task.CompletedTask;
        }

        var today = DateTime.Today;

        var age = today.Year - dateOfBirth.Year;

        if (dateOfBirth.Date > today.AddYears(-age))
            age--;

        if (age >= requirement.MinimumAge)
        {
            context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}