namespace AniTracker.Api.Contracts;

internal interface IUserMediaFactory
{
    UserMedia CreateUserMedia(Guid userId, Guid mediaId);
}
