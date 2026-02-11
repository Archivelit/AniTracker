namespace AniTracker.Api.Endpoints;

public static class MediaEndpoints
{
    public static void MapMediaEndpoints(this WebApplication app)
    {
        app.MapGet("/medias/{id:guid}", GetById)
            .AllowAnonymous();

        app.MapGet("/medias", GetMedias)
            .AllowAnonymous();

        app.MapPost("/medias", Register)
            .AddEndpointFilter<RegisterMediaValidationFilter>();

        app.MapPatch("/medias/{id:guid}", Update)
            .AddEndpointFilter<UpdateMediaValidationFilter>();
    }

    private static async Task<IResult> GetMedias(AniTrackerDbContext dbContext, CancellationToken ct, int count = 10)
    {
        if (count <= 0 || count > 100) 
            return Results.BadRequest();
        
        var medias = await dbContext.Medias
            .AsNoTracking()
            .Take(count)
            .Select(m => new MediaDto(
                m.Id, 
                m.Title, 
                m.Episodes, 
                m.Synopsis, 
                m.AiredFrom, 
                m.AiredTo, 
                m.Status))
            .ToListAsync(ct);

        return Results.Ok(medias);
    }

    private static async Task<IResult> GetById(Guid id, AniTrackerDbContext dbContext,
        CancellationToken ct)
    {
        var media = await dbContext.Medias.AsNoTracking().FirstOrDefaultAsync(m => m.Id == id, ct);

        return media is not null
            ? Results.Ok(new MediaDto(media))
            : Results.NotFound("Media not found");
    }

    private static async Task<IResult> Register(RegisterMediaDto registerMediaDto, AniTrackerDbContext dbContext, CancellationToken ct)
    {
        var media = registerMediaDto.AsEntity();

        await dbContext.Medias.AddAsync(media, ct);
        await dbContext.SaveChangesAsync(ct);

        return Results.Created($"/medias/{media.Id}", new MediaDto(media));
    }

    private static async Task<IResult> Update(UpdateMediaDto dto, Guid id, AniTrackerDbContext dbContext, CancellationToken ct)
    {
        var exists = await dbContext.Medias.AsNoTracking().AnyAsync(m => m.Id == id, ct);

        if (!exists)
            throw new NotFoundException($"Media {id} doesn't exist");

        await dbContext.Medias.Where(m => m.Id == id)
            .ExecuteUpdateAsync(builder =>
            {
                builder.UpdateIfNotNull(m => m.Title, dto.Title);
                builder.UpdateIfNotNull(m => m.Synopsis, dto.Synopsis);
                builder.UpdateIfNotNull(m => m.Episodes, dto.Episodes);
                builder.UpdateIfNotNull(m => m.EpisodeDurationInTicks, dto.EpisodeDurationInTicks);
                builder.UpdateIfNotNull(m => m.AiredFrom, dto.AiredFrom);
                builder.UpdateIfNotNull(m => m.AiredTo, dto.AiredTo);
                builder.UpdateIfNotNull(m => m.Status, dto.Status);
            }, ct);

        return Results.NoContent();
    }
}