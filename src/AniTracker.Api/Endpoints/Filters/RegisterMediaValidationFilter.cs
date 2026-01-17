namespace AniTracker.Api.Endpoints.Filters;

public class RegisterMediaValidationFilter : IEndpointFilter
{
    private readonly ITitleValidator _titleValidator;

    public RegisterMediaValidationFilter(ITitleValidator titleValidator)
    {
        _titleValidator = titleValidator;
    }
    public ValueTask<object?> InvokeAsync(
        EndpointFilterInvocationContext context,
        EndpointFilterDelegate next)
    {
        var dto = context.GetArgument<RegisterMediaDto>(0);

        if (_titleValidator.IsValid(dto.Title)) return ValueTask.FromResult<object?>(Results.BadRequest("Title is required"));

        if (dto.Episodes <= 0) return ValueTask.FromResult<object?>(Results.BadRequest("Episodes must be positive"));

        if (dto.EpisodeDurationInTicks < 0) return ValueTask.FromResult<object?>(Results.BadRequest("Episode duration must be positive"));

        if (dto.AiredFrom > dto.AiredTo) return ValueTask.FromResult<object?>(Results.BadRequest("Start date cannot be after end date"));

        if (dto.Synopsis is null) return ValueTask.FromResult<object?>(Results.BadRequest("Synopsis is required"));


        return next(context);
    }
}
