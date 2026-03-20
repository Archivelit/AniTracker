namespace AniTracker.Api.Endpoints.Filters;

public class UserCredentialsValidationFilter : IEndpointFilter
{
    private readonly IEmailValidator _emailValidator;

    public UserCredentialsValidationFilter(IEmailValidator emailValidator) => _emailValidator = emailValidator;

    public ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        if (context.Arguments[0] is not LoginUserDto dto)
        {
            return ValueTask.FailValidation("Invalid model received");
        }

        if (string.IsNullOrEmpty(dto.Password))
            return ValueTask.FailValidation("Invalid password");

        if (!_emailValidator.IsValid(dto.Email))
            return ValueTask.FailValidation("Invalid email");

        return next(context);
    }
}