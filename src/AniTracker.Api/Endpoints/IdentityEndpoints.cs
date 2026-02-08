namespace AniTracker.Api.Endpoints;

public static class IdentityEndpoints
{
    public static void MapIdentityEndpoints(this WebApplication app) => app.MapPost("/users/login", Login)
        .AddEndpointFilter<UserCredentialsValidationFilter>();

    private static async Task<IResult> Login(LoginUserDto dto, AniTrackerDbContext dbContext, 
        IPasswordHasher hasher, ITokenFactory tokenFactory)
    {
        var user = await dbContext.Users
            .AsNoTracking()
            .SingleOrDefaultAsync(u => u.Email == dto.Email);

        if (user is null)
            throw new NotFoundException($"User with {dto.Email} email not found");

        if (!hasher.Verify(dto.Password, user.PasswordHash))
            return Results.BadRequest("Worng password");

        var token = tokenFactory.CreateToken(user);

        return Results.Ok(token);
    }
}