namespace AniTracker.Api.Endpoints.Filters;

public class RegisterUserValidationFilter : IEndpointFilter
{
    private static readonly ValueTask<object?> BadRequest = ValueTask.FromResult<object?>(Results.BadRequest("Invalid model or data"));

    public ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext invocationContext,
        EndpointFilterDelegate next)
    {
        if (invocationContext.Arguments[0] is not RegisterUserDto regUserDto)
        {
            return BadRequest;
        }

        return IsValidDto(regUserDto)
            ? next(invocationContext)
            : BadRequest;
    }

    private static bool IsValidDto(RegisterUserDto dto)
    {
        if (dto is null || dto.Username is null)
            return false;

        dto = dto with
        {
            Username = dto.Username.Trim()
        };

        if (!dto.Email.IsValidEmail())
            return false;

        if (dto.Username.Length < 3 || !dto.Username.Any(char.IsLetter))
            return false;

        if (dto.Password.Length < 8)
            return false;

        return dto.Password.Any(char.IsLower) 
               && dto.Password.Any(char.IsDigit) 
               && dto.Password.Any(char.IsUpper) 
               && dto.Password.Any(char.IsSymbol);
    }
}