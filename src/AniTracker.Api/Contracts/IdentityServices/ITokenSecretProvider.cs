namespace AniTracker.Api.Contracts.IdentityServices;

public interface ITokenSecretProvider
{
    public byte[] TokenSecret { get; }
}
