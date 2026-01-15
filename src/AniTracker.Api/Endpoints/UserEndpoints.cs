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

        app.MapPatch("/users/{id:guid}", UpdateUser);
    }

    private static async Task<IResult> GetUserById(Guid id, AniTrackerDbContext dbContext, 
        CancellationToken ct)
    {
        var user = await dbContext.Users.AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == id, ct)
            .ConfigureAwait(false);
        
        return user is null 
            ? Results.Ok(user)
            : Results.NotFound();
    }
    
    private static async Task<IResult> GetUserByEmail(string email, AniTrackerDbContext dbContext, 
        CancellationToken ct)
    {
        var user = await dbContext.Users.AsNoTracking()
            .FirstOrDefaultAsync(u => u.Email == email, ct)
            .ConfigureAwait(false);
        
        return user is null 
            ? Results.Ok(user)
            : Results.NotFound();
    }

    private static async Task<IResult> RegisterUser(RegisterUserDto registerUserDto, AniTrackerDbContext dbContext, 
        ILogger logger, CancellationToken ct)
    {
        // TODO: add password hashing
        var passwordHash = string.Empty;
        
        var user = new User(registerUserDto.Username, registerUserDto.Email, passwordHash);

        try
        {
            await dbContext.Users.AddAsync(user, ct).ConfigureAwait(false);
            await dbContext.SaveChangesAsync(ct);
            return Results.Created($"/users/{user.Id}", user);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error occured during user registration");
            return Results.InternalServerError();
        }
    }

    private static async Task<IResult> UpdateUser(UpdateUserDto updateUserDto, Guid id, 
        AniTrackerDbContext dbContext, ILogger logger, CancellationToken ct)
    {
        string? passwordHash = null;
        
        if (updateUserDto.Password is not null)
        {
            // TODO: add password hashing
            passwordHash = string.Empty;
        }
        
        try
        {
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
        catch (Exception ex)
        {
            logger.LogError(ex, "Error occured during user update");
            return Results.InternalServerError();
        }
    }

    private static void UpdateIfNotNull<TProperty>(this UpdateSettersBuilder<User> builder, 
        Expression<Func<User,TProperty>> propertyExpression, TProperty newValue)
    {
        if (newValue is not null) builder.SetProperty(propertyExpression, newValue);
    }
}