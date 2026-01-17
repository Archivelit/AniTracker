namespace AniTracker.Api.Endpoints;

public static class UserEndpoints
{
    public static void MapUserEndpoints(this WebApplication app)
    {
        app.MapGet("/users/{id:guid}", GetUserById);

        app.MapGet("/users", GetUserByEmail)
           .AddEndpointFilter<EmailValidationFilter>();

        app.MapPost("/users", RegisterUser)
            .AddEndpointFilter<RegisterUserValidationFilter>();

        app.MapPatch("/users/{id:guid}", UpdateUser)
            .AddEndpointFilter<UpdateUserValidationFilter>();
    }

    private static async Task<IResult> GetUserById(Guid id, AniTrackerDbContext dbContext, 
        CancellationToken ct)
    {
        var user = await dbContext.Users.AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == id, ct)
            .ConfigureAwait(false);

        return user is not null
            ? Results.Ok(user)
            : Results.NotFound("User not found");
    }

    private static async Task<IResult> GetUserByEmail(string email, AniTrackerDbContext dbContext, 
        CancellationToken ct)
    {
        var user = await dbContext.Users.AsNoTracking()
            .FirstOrDefaultAsync(u => u.Email == email, ct)
            .ConfigureAwait(false);

        return user is not null
            ? Results.Ok(user)
            : Results.NotFound("User not found");
    }

    private static async Task<IResult> RegisterUser(RegisterUserDto registerUserDto, AniTrackerDbContext dbContext, 
        ILoggerFactory loggerFactory, IPasswordHasher hasher, CancellationToken ct)
    {
        var logger = loggerFactory.CreateLogger("UserEndpoints");
        var passwordHash = hasher.Hash(registerUserDto.Password);

        var userExists = await dbContext.Users.AsNoTracking()
            .AnyAsync(u => u.Email == registerUserDto.Email, ct)
            .ConfigureAwait(false);

        if (!userExists)
            throw new DuplicateException($"Email is already taken");

        var user = new User(registerUserDto.Username, registerUserDto.Email, passwordHash);

        await dbContext.Users.AddAsync(user, ct).ConfigureAwait(false);
        await dbContext.SaveChangesAsync(ct).ConfigureAwait(false);
        return Results.Created($"/users/{user.Id}", user);
    }

    private static async Task<IResult> UpdateUser(UpdateUserDto updateUserDto, Guid id, 
        AniTrackerDbContext dbContext, ILoggerFactory loggerFactory, IPasswordHasher hasher, CancellationToken ct)
    {
        var logger = loggerFactory.CreateLogger("UserEndpoints");
        string? passwordHash = null;
        
        if (updateUserDto.Password is not null)
        {
            passwordHash = hasher.Hash(updateUserDto.Password);
        }

        var userExists = await dbContext.Users.AsNoTracking()
            .AnyAsync(u => u.Id == id, ct)
            .ConfigureAwait(false);

        if (!userExists)
            throw new NotFoundException($"User {id} doesn't exist");
        
        var updatedFields = await dbContext.Users.Where(u => u.Id == id)
            .ExecuteUpdateAsync(builder =>
            {
                builder.UpdateIfNotNull(user => user.Username, updateUserDto.Username);
                builder.UpdateIfNotNull(user => user.Email, updateUserDto.Email);
                builder.UpdateIfNotNull(user => user.PasswordHash, passwordHash);
            }, ct)
            .ConfigureAwait(false);
        return Results.Ok();
    }

    private static void UpdateIfNotNull<TProperty>(this UpdateSettersBuilder<User> builder, 
        Expression<Func<User,TProperty>> propertyExpression, TProperty newValue)
    {
        if (newValue is not null) builder.SetProperty(propertyExpression, newValue);
    }
}