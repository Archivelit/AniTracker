namespace AniTracker.Api.Filters;

public class EmailValidationFilter : IEndpointFilter
{
    public ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext invocationContext, EndpointFilterDelegate next)
    {
        if (invocationContext.Arguments[0] is string email && IsValidEmail(email))
            return next(invocationContext);
        
        return ValueTask.FromResult<object?>(Results.BadRequest());
    }
    
    private static bool IsValidEmail(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
            return false;
        
        var trimmedEmail = email.Trim();

        if (trimmedEmail.EndsWith("."))
            return false;
        try 
        {
            var addr = new System.Net.Mail.MailAddress(email);
            return addr.Address == trimmedEmail;
        }
        catch 
        {
            return false;
        }
    }
}