namespace AniTracker.Api.Dto;

public record MediaDto(Guid Id, string Title, int Episodes, string? Synopsis, DateTime? AiredFrom, DateTime? AiredTo, MediaStatus Status)
{
    public MediaDto(Media media) 
        : this(media.Id, media.Title, media.Episodes, media.Synopsis, media.AiredFrom, media.AiredTo, media.Status) { }
}