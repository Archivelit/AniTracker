namespace AniTracker.Api.Contracts.IdentityServices;

public interface ITokenFactory
{
    public string CreateToken(User user);
}
