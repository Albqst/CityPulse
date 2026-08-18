namespace CityPulse.Models;

public class User
{
    public int Id;
    public string Email;
    public string PasswordHash;
    public string Name;
    public enum MyEnum {};
    public enum Role { };
    public DateTime CreatedAt;
    public DateOnly DateOfBirth { get; set; }
}