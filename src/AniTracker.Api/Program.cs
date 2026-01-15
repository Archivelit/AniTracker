using AniTracker.Api.Endpoints;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddDbContext<AniTrackerDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("api-database"));
});

builder.AddServiceDefaults();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapDefaultEndpoints();
app.MapUserEndpoints();

app.UseHttpsRedirection();

app.Run();