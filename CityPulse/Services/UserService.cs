using CityPulse.Database;
using CityPulse.Models;
using Microsoft.EntityFrameworkCore;

namespace CityPulse.Services;

public class UserService
{
    private readonly ApplicationDbContext _db;

    public UserService(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _db.Users.FirstOrDefaultAsync(x => x.Email == email);
    }

    public async Task<User> CreateAsync(User user)
    {
        _db.Users.Add(user);
        await _db.SaveChangesAsync();
        return user;
    }
}