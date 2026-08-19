using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CityPulse.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RequestsController : ControllerBase
{
    [HttpGet]
    // [Authorize]
    public IActionResult Get()
    {
        return Ok("Вы авторизованы.");
    }

    [HttpGet("adult")]
    // [Authorize(Policy = "MinimumAge18")]
    public IActionResult GetAdultContent()
    {
        return Ok("Вам есть 18 лет.");
    }
}