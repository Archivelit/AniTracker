namespace AniTracker.Api.Endpoints;

public static class IdentityEndpoints
{
    public static void MapIdentityEndpoints(this WebApplication app)
    {
        app.MapPost("/users/login", Login)
            .AddEndpointFilter<UserCredentialsValidationFilter>();

        app.MapPost("/me", Me);
    }

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

    private static async Task<IResult> Me(HttpContext context, AniTrackerDbContext dbContext)
    {
        var token = new JwtSecurityToken(context.Request.Cookies["token"]);

        var idStr = token.Claims
            .First(c => c.Type == ClaimTypes.NameIdentifier)
            .Value;
        
        if(!Guid.TryParse(idStr, out var id))
            return Results.BadRequest("Bad token");

        var user = await dbContext.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == id);

        return user is null 
        ? Results.BadRequest($"User {id} not found")
        : Results.Ok(user);
    }
}