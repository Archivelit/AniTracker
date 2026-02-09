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
        var user = await dbContext.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == id, ct);

        return user is not null
            ? Results.Ok(new UserDto(user))
            : Results.NotFound("User not found");
    }

    private static async Task<IResult> GetUserByEmail(string email, AniTrackerDbContext dbContext, 
        CancellationToken ct)
    {
        var user = await dbContext.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Email == email, ct);

        return user is not null
            ? Results.Ok(new UserDto(user))
            : Results.NotFound("User not found");
    }

    private static async Task<IResult> RegisterUser(RegisterUserDto registerUserDto, AniTrackerDbContext dbContext, 
        IPasswordHasher hasher, CancellationToken ct)
    {
        var passwordHash = hasher.Hash(registerUserDto.Password);

        var userExists = await dbContext.Users.AsNoTracking().AnyAsync(u => u.Email == registerUserDto.Email, ct);

        if (userExists)
            throw new DuplicateException($"Email is already taken");

        var user = new User(registerUserDto.Username, registerUserDto.Email, passwordHash, Role.User);

        await dbContext.Users.AddAsync(user, ct);
        await dbContext.SaveChangesAsync(ct);

        return Results.Created($"/users/{user.Id}", new UserDto(user));
    }

    private static async Task<IResult> UpdateUser(UpdateUserDto updateUserDto, Guid id, 
        AniTrackerDbContext dbContext, IPasswordHasher hasher, CancellationToken ct)
    {
        string? passwordHash = null;
        
        if (updateUserDto.Password is not null)
            passwordHash = hasher.Hash(updateUserDto.Password);
        

        var updatedFields = await dbContext.Users.Where(u => u.Id == id)
            .ExecuteUpdateAsync(builder =>
            {
                builder.UpdateIfNotNull(user => user.Username, updateUserDto.Username);
                builder.UpdateIfNotNull(user => user.Email, updateUserDto.Email);
                builder.UpdateIfNotNull(user => user.PasswordHash, passwordHash);
            }, ct);

        return updatedFields == 0 
            ? Results.NotFound($"User {id} not found")
            : Results.NoContent();
    }
}