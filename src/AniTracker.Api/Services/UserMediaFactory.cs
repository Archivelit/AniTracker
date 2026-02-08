namespace AniTracker.Api.Services;

internal sealed class UserMediaFactory : IUserMediaFactory
{
    public UserMedia CreateUserMedia(Guid userId, Guid mediaId) => new()
    {
        Id = Guid.NewGuid(),
        UserId = userId,
        MediaId = mediaId,
        Status = WatchStatus.PlanToWatch,
        Rating = null,
        EpisodesWatched = 0,
        StartDate = null,
        CompletedDate = null,
        IsFavorite = false,
    };
}
