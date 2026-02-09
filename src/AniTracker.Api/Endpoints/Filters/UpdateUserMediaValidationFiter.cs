namespace AniTracker.Api.Endpoints.Filters;

public class UpdateUserMediaValidationFilter : IEndpointFilter
{
    
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
        {
            return ValueTask.FromResult<object?>(Results.BadRequest("Invalid model or data"));
        }

        return IsValidDto(updateUserDto)
            ? next(invocationContext)
            : BadRequest;
    }

    private bool IsValidDto(UpdateUserDto dto)
    {
        if (dto?.Username is null)
            return false;

        dto = dto with
        {
            Username = dto.Username.Trim()
        };

        return _titleValidator.IsValid(dto.Username)
               && _emailValidator.IsValid(dto.Email)
               && _passwordValidator.IsValid(dto.Password);
    }
}