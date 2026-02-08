namespace AniTracker.Api.Endpoints;

public static class MeEndpoints
{
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
        if (!GetUserId(context, out var id))
            return Results.BadRequest("Bad token");

        var user = await dbContext.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == id, ct);

        return user is null
        ? Results.BadRequest($"User {id} not found")
        : Results.Ok(user);
    }

    private static async ValueTask<IResult> DeleteCurrentUser(HttpContext context, AniTrackerDbContext dbContext,
        CancellationToken ct)
    {
        if (!GetUserId(context, out var id))
            return Results.BadRequest("Bad token");

        var deletedUsers = await dbContext.Users
            .Where(u => u.Id == id)
            .ExecuteDeleteAsync(ct);

        return deletedUsers == 0
        ? Results.BadRequest($"User {id} not found")
        : Results.Ok();
    }

    private static async ValueTask<IResult> UpdateCurrentUser(UpdateUserDto updateUserDto, HttpContext context, 
        AniTrackerDbContext dbContext, IPasswordHasher hasher, CancellationToken ct)
    {
        if (!GetUserId(context, out var id))
            return Results.BadRequest("Bad token");

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
        ? Results.NotFound($"User {id} not found")
        : Results.NoContent();
    }

    private static bool GetUserId(HttpContext context, out Guid id)
    {
        var token = new JwtSecurityToken(context.Request.Cookies["token"]);

        var idStr = token.Claims
            .First(c => c.Type == ClaimTypes.NameIdentifier)
            .Value;

        return Guid.TryParse(idStr, out id);
    }
}