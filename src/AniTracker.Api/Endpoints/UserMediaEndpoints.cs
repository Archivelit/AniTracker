namespace AniTracker.Api.Endpoints;

public static class UserMediaEndpoints
{
    public static void MapUserMediaEndpoints(this WebApplication app)
    {
        app.MapGet("/me/medias", GetMedias);

        app.MapGet("/me/medias/{mediaId:guid}", GetMedia);

        app.MapPost("/me/medias/{mediaId:guid}", AddMedia);

        app.MapPatch("/me/medias/{mediaId:guid}", UpdateMedia);

        app.MapDelete("/me/medias/{mediaId:guid}", DeleteMedia);
    }

    private static async ValueTask<IResult> UpdateMedia(Guid mediaId, UpdateUserMediaDto updateUserMediaDto, 
        HttpContext context, AniTrackerDbContext dbContext, CancellationToken ct)
    {
        if (!GetUserId(context, out var id))
            return Results.BadRequest("Bad token");

        var updatedFields = await dbContext.UsersMedia
            .Where(um => um.Id == mediaId && um.UserId == id)
            .ExecuteUpdateAsync(builder =>
            {
                builder.UpdateIfNotNull(um => um.Status, updateUserMediaDto.Status);
                builder.UpdateIfNotNull(um => um.Rating, updateUserMediaDto.Rating);
                builder.UpdateIfNotNull(um => um.EpisodesWatched, updateUserMediaDto.EpisodesWatched);
                builder.UpdateIfNotNull(um => um.StartDate, updateUserMediaDto.StartDate);
                builder.UpdateIfNotNull(um => um.CompletedDate, updateUserMediaDto.CompletedDate);
                builder.UpdateIfNotNull(um => um.IsFavorite, updateUserMediaDto.IsFavorite);
            }, ct);

        return updatedFields == 0
            ? Results.NotFound()
            : Results.Ok();
    }

    private static async ValueTask<IResult> GetMedias(HttpContext context, AniTrackerDbContext dbContext,
        CancellationToken ct)
    {
        if (!GetUserId(context, out var id))
            return Results.BadRequest("Bad token");

        var medias = await dbContext.UsersMedia
            .AsNoTracking()
            .Where(um => um.UserId == id)
            .Join(dbContext.Medias,
                usersMedia => usersMedia.MediaId,
                medias => medias.Id,
                (usersMedia, medias) => new UsersMediaDto
                (
                    usersMedia.Id,
                    usersMedia.UserId,
                    usersMedia.Status,
                    usersMedia.Rating,
                    usersMedia.EpisodesWatched,
                    usersMedia.StartDate,
                    usersMedia.CompletedDate,
                    usersMedia.IsFavorite,

                    new MediaDto
                    (
                        medias.Id,
                        medias.Title,
                        medias.Episodes,
                        medias.Synopsis,
                        medias.AiredFrom,
                        medias.AiredTo,
                        medias.Status
                    )
                )
            )
            .ToListAsync(ct);

        return Results.Ok(medias);
    }

    private static async ValueTask<IResult> GetMedia(Guid mediaId, HttpContext context, AniTrackerDbContext dbContext,
        CancellationToken ct)
    {
        if (!GetUserId(context, out var userId))
            return Results.BadRequest("Bad token");

        var media = await dbContext.UsersMedia
            .AsNoTracking()
            .Where(um => um.Id == mediaId && um.UserId == userId)
            .Join(dbContext.Medias,
                usersMedia => usersMedia.MediaId,
                medias => medias.Id,
                (usersMedia, medias) => new UsersMediaDto
                (
                    usersMedia.Id,
                    usersMedia.UserId,
                    usersMedia.Status,
                    usersMedia.Rating,
                    usersMedia.EpisodesWatched,
                    usersMedia.StartDate,
                    usersMedia.CompletedDate,
                    usersMedia.IsFavorite,

                    new MediaDto
                    (
                        medias.Id,
                        medias.Title,
                        medias.Episodes,
                        medias.Synopsis,
                        medias.AiredFrom,
                        medias.AiredTo,
                        medias.Status
                    )
                )
            )
            .FirstOrDefaultAsync(ct);

        return media is null
            ? Results.BadRequest()
            : Results.Ok(media);
    }

    private static async ValueTask<IResult> AddMedia(Guid mediaId, HttpContext context, 
        AniTrackerDbContext dbContext, IUserMediaFactory factory, CancellationToken ct)
    {
        if (!GetUserId(context, out var id))
            return Results.BadRequest("Bad token");

        var userMedia = factory.CreateUserMedia(id, mediaId);

        await dbContext.UsersMedia.AddAsync(userMedia, ct);

        await dbContext.SaveChangesAsync(ct);

        return Results.Created($"/me/medias/{mediaId}", userMedia);
    }


    private static async Task<IResult> DeleteMedia(Guid mediaId, HttpContext context, 
        AniTrackerDbContext dbContext, CancellationToken ct)
    {
        if (!GetUserId(context, out var id))
            return Results.BadRequest("Bad token");

        var deleted = await dbContext.UsersMedia
            .Where(um => um.MediaId == mediaId && um.UserId == id)
            .ExecuteDeleteAsync(ct);
        
        return deleted == 0 
            ? Results.NotFound($"Media {mediaId} for user {id} not found")
            : Results.Ok();
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