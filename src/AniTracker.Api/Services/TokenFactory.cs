namespace AniTracker.Api.Services;

internal sealed class TokenFactory : ITokenFactory
{
    private readonly ITokenSecretProvider _secretProvider;

    public TokenFactory(ITokenSecretProvider secretProvider) => _secretProvider = secretProvider;

    public string CreateToken(User user)
    {
        var securityKey = new SymmetricSecurityKey(_secretProvider.TokenSecret);
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
        var claims = GetClaims(user);

        var token = new JwtSecurityToken(
            claims: claims, 
            expires: DateTime.Now.AddMinutes(10), 
            signingCredentials: credentials
            );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private static Claim[] GetClaims(User user) =>
        [
            new(JwtRegisteredClaimNames.Sub, user.Email),
            new(ClaimTypes.NameIdentifier, user.Id.ToString())
        ];
}
