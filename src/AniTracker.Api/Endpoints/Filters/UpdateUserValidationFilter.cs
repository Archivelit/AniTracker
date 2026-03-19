namespace AniTracker.Api.Endpoints.Filters;

public class UpdateUserValidationFilter : IEndpointFilter
{
    private readonly ITitleValidator _titleValidator;
    private readonly IEmailValidator _emailValidator;
    private readonly IPasswordValidator _passwordValidator;
    
    public UpdateUserValidationFilter(ITitleValidator titleValidator, IEmailValidator emailValidator,
        IPasswordValidator passwordValidator)
    {
        _titleValidator = titleValidator;
        _emailValidator = emailValidator;
        _passwordValidator = passwordValidator;
    }
    
    public ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext invocationContext,
        EndpointFilterDelegate next)
    {
        if (invocationContext.Arguments[0] is not UpdateUserDto updateUserDto)
            return ValueTask.FailValidation("Invalid model received");

        if (updateUserDto?.Username is null) return ValueTask.FailValidation("Username cannot be empty");

        updateUserDto = updateUserDto with
        {
            Username = updateUserDto.Username.Trim()
        };

        if (!_titleValidator.IsValid(updateUserDto.Username)) 
            return ValueTask.FailValidation("Invalid username");

        if (updateUserDto.Email is null || !_emailValidator.IsValid(updateUserDto.Email)) 
            return ValueTask.FailValidation("Invalid email");

        if (updateUserDto.Password is null || !_passwordValidator.IsValid(updateUserDto.Password)) 
            return ValueTask.FailValidation("Invalid password");

        return next(invocationContext);
    }
}