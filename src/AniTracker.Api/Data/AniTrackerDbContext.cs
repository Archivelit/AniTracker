using Microsoft.EntityFrameworkCore;

namespace AniTracker.Api.Data;

internal class AniTrackerDbContext : DbContext
{
    public AniTrackerDbContext(DbContextOptions<AniTrackerDbContext> options) : base(options) { }
}