namespace CityPulse.Models;

public class User
{
    private string Id;
    private string Email;
    private Guid PasswordHash;
    private string Name;
    private enum MyEnum {};
    private enum Role { };
    private DateTime CreatedAt;
}