namespace AniTracker.Api.Endpoints.Filters;

public class RegisterMediaValidationFilter : IEndpointFilter
{
    private readonly ITitleValidator _titleValidator;

    public RegisterMediaValidationFilter(ITitleValidator titleValidator) => _titleValidator = titleValidator;
    
    public ValueTask<object?> InvokeAsync(
        EndpointFilterInvocationContext context,
        EndpointFilterDelegate next)
    {
        var dto = context.GetArgument<RegisterMediaDto>(0);

        if (_titleValidator.IsValid(dto.Title)) return ValueTask.FailValidation("Invalid title");

        if (dto.Episodes <= 0) return ValueTask.FailValidation("Episodes must be positive");

        if (dto.EpisodeDurationInTicks < 0) return ValueTask.FailValidation("Episode duration must be positive");

        if (dto.AiredFrom > dto.AiredTo) return ValueTask.FailValidation("Start date cannot be after end date");

        if (dto.Synopsis is null) return ValueTask.FailValidation("Synopsis is required");

        return next(context);
    }
}
