using CityPulse.Authorization;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args: args);
var services = builder.Services;
services.AddAuthorization(options =>
{
    options.AddPolicy("MinimumAge18", policy =>
    {
        policy.Requirements.Add(
            new MinimumAgeRequirement(18));
    });
});

services.AddSingleton<
    IAuthorizationHandler,
    MinimumAgeHandler>();

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
services.AddControllers();
services.AddOpenApi();
services.AddSwaggerGen();

// Регистрация сервисов
services.AddAuthentication(defaultScheme: CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(configureOptions: options => {
        options.LoginPath = "/Account/Login";
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseSwagger();

app.UseSwaggerUI();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();