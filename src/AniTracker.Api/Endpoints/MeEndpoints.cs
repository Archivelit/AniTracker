using Microsoft.AspNetCore.Authorization;

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

    [Authorize]
    private static async ValueTask<IResult> GetCurrentUser(HttpContext context, AniTrackerDbContext dbContext,
        ILoggerFactory factory, CancellationToken ct)
    {
        if (!TryGetUserId(context, out var id))
            return LogAndReturnInvalidToken(factory.CreateLogger("MeEndpoints"));

        var user = await dbContext.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == id, ct);

        return user is null
            ? Results.BadRequest($"User not found")
            : Results.Ok(new UserDto(user));
    }

    [Authorize]
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

    [Authorize]
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

    private static IResult LogAndReturnInvalidToken(ILogger logger)
    {
        logger.LogError("Got invalid token");
        return Results.UnprocessableEntity("Invalid token");
    }

    private static bool TryGetUserId(HttpContext context, out Guid id)
    {
        var idStr = context.User.FindFirstValue(JwtRegisteredClaimNames.NameId);

        return Guid.TryParse(idStr, out id);
    }
}