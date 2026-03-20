namespace AniTracker.Api.Endpoints;

public static class IdentityEndpoints
{
    public static void MapIdentityEndpoints(this WebApplication app) => app.MapPost("/auth/login", Login)
        .AddEndpointFilter<UserCredentialsValidationFilter>()
        .AllowAnonymous();

    private static async Task<IResult> Login([FromBody] LoginUserDto dto, AniTrackerDbContext dbContext, 
        IPasswordHasher hasher, ITokenFactory tokenFactory)
    {
        var user = await dbContext.Users
            .AsNoTracking()
            .SingleOrDefaultAsync(u => u.Email == dto.Email);

        if (user is null)
            return Results.NotFound($"User not found");

        if (!hasher.Verify(dto.Password, user.PasswordHash))
            return Results.BadRequest("Invalid password");

        var token = tokenFactory.CreateToken(user);

        return Results.Ok(token);
    }
}