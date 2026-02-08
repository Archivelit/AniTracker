namespace AniTracker.Api.Dto;

public record UsersMediaDto(Guid Id, Guid UserId, WatchStatus Status, int? Rating, int EpisodesWatched, 
    DateTime? StartDate, DateTime? CompletedDate, bool IsFavorite, MediaDto MediaData);
