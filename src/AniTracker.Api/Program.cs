var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

builder.Services.AddOpenApi();
builder.Services.AddHttpLogging();
builder.Logging.AddConsole();
builder.Services.AddDbContext<AniTrackerDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("api-database"));
});
builder.Services.AddSingleton<ITokenSecretProvider, TokenSecretProvider>();
builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();
builder.Services.AddScoped<ITokenFactory, TokenFactory>();
builder.Services.AddTransient<IEmailValidator, EmailValidator>();
builder.Services.AddTransient<IPasswordValidator, PasswordValidator>();
builder.Services.AddTransient<ITitleValidator, TitleValidator>();
builder.Services.AddScoped<ExceptionMiddleware>();

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            IssuerSigningKey = new SymmetricSecurityKey(TokenSecretProvider.Secret),

            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddAuthorization();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapDefaultEndpoints();
app.MapUserEndpoints();
app.MapIdentityEndpoints();
app.MapMeEndpoints();
app.MapUserMediaEndpoints();

app.UseHttpsRedirection();
app.UseExceptionHandling();
app.UseAuthentication();
app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<AniTrackerDbContext>();
    await db.Database.MigrateAsync();
}

app.Run();