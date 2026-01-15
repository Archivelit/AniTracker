var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddLogging(loggingBuilder => loggingBuilder.AddConfiguration(builder.Configuration).AddConsole());
builder.Services.AddDbContext<AniTrackerDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("api-database"));
});
builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();

builder.AddServiceDefaults();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapDefaultEndpoints();
app.MapUserEndpoints();

app.UseHttpsRedirection();

if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<AniTrackerDbContext>();
    await db.Database.MigrateAsync();
}

app.Run();