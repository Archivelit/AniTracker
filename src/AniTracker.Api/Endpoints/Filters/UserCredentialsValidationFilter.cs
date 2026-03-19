namespace AniTracker.Api.Endpoints.Filters;

public class UserCredentialsValidationFilter : IEndpointFilter
{
    private readonly IPasswordValidator _passwordValidator;
    private readonly IEmailValidator _emailValidator;

    public UserCredentialsValidationFilter(IPasswordValidator passwordValidator,
    IEmailValidator emailValidator)
    {
        _passwordValidator = passwordValidator;
        _emailValidator = emailValidator;
    }
    
    public ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        if (context.Arguments[0] is not LoginUserDto dto)
        {
            return ValueTask.FailValidation("Invalid model received");
        }

        if (!_passwordValidator.IsValid(dto.Password))
            return ValueTask.FailValidation("Invalid password");

        if (!_emailValidator.IsValid(dto.Email))
            return ValueTask.FailValidation("Invalid email");

        return next(context);
    }
}