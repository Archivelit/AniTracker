namespace AniTracker.Api.Endpoints.Filters;

public class RegisterUserValidationFilter : IEndpointFilter
{
    private static ValueTask<object?> UnprocessableEntity(string msg) => ValueTask.FromResult<object?>(Results.UnprocessableEntity(msg));

    private readonly ITitleValidator _titleValidator;
    private readonly IEmailValidator _emailValidator;
    private readonly IPasswordValidator _passwordValidator;
    
    public RegisterUserValidationFilter(ITitleValidator titleValidator, IEmailValidator emailValidator,
        IPasswordValidator passwordValidator)
    {
        _titleValidator = titleValidator;
        _emailValidator = emailValidator;
        _passwordValidator = passwordValidator;
    }
    
    public ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext invocationContext,
        EndpointFilterDelegate next)
    {
        if (invocationContext.Arguments[0] is not RegisterUserDto regUserDto) return UnprocessableEntity("Ivalid data model");

        if (!IsValidUsername(regUserDto)) return UnprocessableEntity("Invalid username");
        if (!_emailValidator.IsValid(regUserDto.Email)) return UnprocessableEntity("Invalid email");
        if (!_passwordValidator.IsValid(regUserDto.Password)) return UnprocessableEntity("Invalid password");

        return next(invocationContext);
    }

    private bool IsValidUsername(RegisterUserDto dto)
    {
        if (dto?.Username is null)
            return false;

        dto = dto with
        {
            Username = dto.Username.Trim()
        };

        return _titleValidator.IsValid(dto.Username);
    }
}