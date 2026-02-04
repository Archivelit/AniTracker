namespace AniTracker.Api.Helpers;

internal sealed class TokenSecretProvider : ITokenSecretProvider
{
    public static byte[] Secret { get; } = Encoding.UTF8.GetBytes(Guid.NewGuid().ToString());
    public byte[] TokenSecret => Secret;
}
