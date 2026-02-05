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
        if (context.Arguments[0] is not LoginUserDto)
        {
            return ValueTask.FromResult<object?>(
                Results.BadRequest("Invalid model or data.")
                );
        }

        var dto = (LoginUserDto)context.Arguments[0]!;
        if (!_passwordValidator.IsValid(dto.Password)
        || !_emailValidator.IsValid(dto.Email))
        {
            return ValueTask.FromResult<object?>(
                Results.BadRequest("Invalid model or data.")
                ); 
        }

        return next(context);
    }
}