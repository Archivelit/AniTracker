namespace AniTracker.Api.Models;

public class Media
{
    public required Guid Id { get; set; }
    public required string Title { get; set; }
    public required int Episodes { get; set; }
    public required long EpisodeDurationInTicks { get; set; }
    public string? Synopsis { get; set; }
    public DateTime? AiredFrom { get; set; }
    public DateTime? AiredTo { get; set; }
    public MediaStatus Status { get; set; }
}