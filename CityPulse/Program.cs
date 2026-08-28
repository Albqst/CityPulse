using CityPulse.Authorization;
using CityPulse.Database;
using CityPulse.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args: args);
var services = builder.Services;

// builder.Services.AddSingleton<UserService>();
builder.Services.AddSingleton<JwtService>();
builder.Services.AddSingleton<PasswordHasher<CityPulse.Models.User>>();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<UserService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

services.AddAuthorization(options =>
{
    options.AddPolicy("MinimumAge18", policy =>
    {
        policy.Requirements.Add(
            new MinimumAgeRequirement(18));
    });
});
var hasher = new PasswordHasher<CityPulse.Models.User>();
var user = new CityPulse.Models.User();
var hash = hasher.HashPassword(user, "1");
Console.WriteLine(hash);
Console.WriteLine(hash);


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
app.UseCors("AllowAll");
app.UseSwagger();
app.UseSwaggerUI();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();