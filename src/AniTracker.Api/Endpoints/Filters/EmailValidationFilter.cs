namespace AniTracker.Api.Endpoints.Filters;

public class EmailValidationFilter : IEndpointFilter
{
    private readonly IEmailValidator _emailValidator;

    public EmailValidationFilter(IEmailValidator emailValidator) => _emailValidator = emailValidator;

    public ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext invocationContext, EndpointFilterDelegate next)
    {
        if (invocationContext.Arguments[0] is not string email) return ValueTask.FailValidation("Invalid parameter received");
        if (!_emailValidator.IsValid(email)) return ValueTask.FailValidation("Invalid email");
        
        return next(invocationContext);
    }
}