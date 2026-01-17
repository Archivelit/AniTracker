namespace AniTracker.Api.Dto;

public record RegisterMediaDto(string Title, int Episodes, long EpisodeDurationInTicks, string? Synopsis, DateTime? AiredFrom, DateTime? AiredTo, MediaStatus Status)
{
    public Media AsEntity() => new()
    {
        Id = Guid.NewGuid(),
        Title = Title,
        Episodes = Episodes,
        EpisodeDurationInTicks = EpisodeDurationInTicks,
        Synopsis = Synopsis,
        AiredFrom = AiredFrom,
        AiredTo = AiredTo,
        Status = Status
    };
}
