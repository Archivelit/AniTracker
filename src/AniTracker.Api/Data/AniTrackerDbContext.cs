namespace AniTracker.Api.Data;

internal class AniTrackerDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Media> Medias { get; set; }
    public DbSet<UserMedia> UsersMedia { get; set; }

    public AniTrackerDbContext(DbContextOptions<AniTrackerDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var users = modelBuilder.Entity<User>();


        users.ToTable("Users");

        users.HasKey(u => u.Id);
        users.HasIndex(u => u.Email).IsUnique();
        users.Property(u => u.Username).HasMaxLength(50).IsRequired();
        users.Property(u => u.PasswordHash).IsRequired();

        var medias = modelBuilder.Entity<Media>();

        medias.ToTable("Medias");

        medias.HasKey(m => m.Id);

        medias.Property(m => m.Title).HasMaxLength(256);
        medias.Property(m => m.Episodes);
        medias.Property(m => m.EpisodeDurationInTicks);
        medias.Property(m => m.Synopsis);
        medias.Property(m => m.AiredFrom);
        medias.Property(m => m.AiredTo);
        medias.Property(m => m.Status);

        var usersMedia = modelBuilder.Entity<UserMedia>();

        usersMedia.ToTable("UsersMedia");

        usersMedia.HasKey(u => u.Id);

        usersMedia.Property(u => u.UserId);
        usersMedia.Property(u => u.MediaId);
        usersMedia.Property(u => u.Status);
        usersMedia.Property(u => u.Rating);
        usersMedia.Property(u => u.EpisodesWatched);
        usersMedia.Property(u => u.StartDate);
        usersMedia.Property(u => u.CompletedDate);
        usersMedia.Property(u => u.IsFavorite);

        base.OnModelCreating(modelBuilder);
    }
}