namespace AniTracker.Api.Endpoints.Filters;

public class RegisterUserValidationFilter : IEndpointFilter
{
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
        if (invocationContext.Arguments[0] is not RegisterUserDto regUserDto) 
            return ValueTask.FailValidation("Ivalid data model");

        if (!IsValidUsername(regUserDto)) return ValueTask.FailValidation("Invalid username");
        if (!_emailValidator.IsValid(regUserDto.Email)) return ValueTask.FailValidation("Invalid email");
        if (!_passwordValidator.IsValid(regUserDto.Password)) return ValueTask.FailValidation("Invalid password");

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