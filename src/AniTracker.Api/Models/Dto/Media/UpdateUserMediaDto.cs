namespace AniTracker.Api.Dto;

public record UpdateUserMediaDto(WatchStatus? Status, int? Rating, int? EpisodesWatched,
    DateTime? StartDate, DateTime? CompletedDate, bool? IsFavorite);