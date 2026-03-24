namespace AniTracker.Api.Endpoints;

public static class MeEndpoints
{
    private static readonly JwtSecurityTokenHandler _jwtSecurityTokenHandler = new JwtSecurityTokenHandler();

    public static void MapMeEndpoints(this WebApplication app)
    {
        app.MapGet("/me", GetCurrentUser);

        app.MapPatch("/me", UpdateCurrentUser)
            .AddEndpointFilter<UpdateUserValidationFilter>();

        app.MapDelete("/me", DeleteCurrentUser);
    }

    private static async ValueTask<IResult> GetCurrentUser(HttpContext context, AniTrackerDbContext dbContext, 
        CancellationToken ct)
    {
        if (!TryGetUserId(context, out var id))
            return Results.UnprocessableEntity("Invalid token");

        var user = await dbContext.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == id, ct);

        return user is null
            ? Results.BadRequest($"User not found")
            : Results.Ok(new UserDto(user));
    }

    private static async ValueTask<IResult> DeleteCurrentUser(HttpContext context, AniTrackerDbContext dbContext,
        CancellationToken ct)
    {
        if (!TryGetUserId(context, out var id))
            return Results.UnprocessableEntity("Invalid token");

        var deletedUsers = await dbContext.Users
            .Where(u => u.Id == id)
            .ExecuteDeleteAsync(ct);

        return deletedUsers == 0
            ? Results.BadRequest($"User not found")
            : Results.Ok();
    }

    private static async ValueTask<IResult> UpdateCurrentUser([FromBody] UpdateUserDto updateUserDto, HttpContext context, 
        AniTrackerDbContext dbContext, IPasswordHasher hasher, CancellationToken ct)
    {
        if (!TryGetUserId(context, out var id))
            return Results.UnprocessableEntity("Invalid token");

        string? passwordHash = null;

        if (updateUserDto.Password is not null)
            passwordHash = hasher.Hash(updateUserDto.Password);

        var updatedFields = await dbContext.Users
            .Where(u => u.Id == id)
            .ExecuteUpdateAsync(builder =>
            {
                builder.UpdateIfNotNull(user => user.Username, updateUserDto.Username);
                builder.UpdateIfNotNull(user => user.Email, updateUserDto.Email);
                builder.UpdateIfNotNull(user => user.PasswordHash, passwordHash);
            }, ct);

        return updatedFields == 0
            ? Results.NotFound($"User not found")
            : Results.NoContent();
    }

    private static bool TryGetUserId(HttpContext context, out Guid id)
    {
        var token = _jwtSecurityTokenHandler.ReadJwtToken(context.Request.Cookies["token"]);
        if (token is null)
        {
            id = Guid.Empty;
            return false;
        }

        var idStr = token.Claims
            .First(c => c.Type == ClaimTypes.NameIdentifier)
            .Value;

        return Guid.TryParse(idStr, out id);
    }
}