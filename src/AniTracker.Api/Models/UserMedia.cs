namespace AniTracker.Api.Models;

public class UserMedia
{
    public required Guid Id { get; set; }
    public required Guid UserId { get; set; }
    public required Guid MediaId { get; set; }
    public required WatchStatus Status { get; set; }
    public required int? Rating { get; set; }
    public required int EpisodesWatched { get; set; }
    public required DateTime? StartDate { get; set; }
    public required DateTime? CompletedDate { get; set; }
    public required bool IsFavorite { get; set; }
}