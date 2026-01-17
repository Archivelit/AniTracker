namespace AniTracker.Api.Dto;

public record UpdateMediaDto(string? Title, int? Episodes, long? EpisodeDurationInTicks, string? Synopsis, DateTime? AiredFrom, DateTime? AiredTo, MediaStatus? Status);
