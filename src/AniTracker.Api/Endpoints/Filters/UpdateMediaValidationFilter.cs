namespace AniTracker.Api.Endpoints.Filters;

public class UpdateMediaValidationFilter : IEndpointFilter
{
    private readonly ITitleValidator _titleValidator;

    public UpdateMediaValidationFilter(ITitleValidator titleValidator)
    {
        _titleValidator = titleValidator;
    }

    public ValueTask<object?> InvokeAsync(
        EndpointFilterInvocationContext context,
        EndpointFilterDelegate next)
    {
        var dto = context.GetArgument<UpdateMediaDto>(0);

        if (dto.Title is not null && !_titleValidator.IsValid(dto.Title)) return ValueTask.FromResult<object?>(Results.BadRequest("Title is required"));

        if (dto.Episodes is not null && dto.Episodes <= 0) return ValueTask.FromResult<object?>(Results.BadRequest("Episodes must be positive"));

        if (dto.EpisodeDurationInTicks is not null && dto.EpisodeDurationInTicks < 0) return ValueTask.FromResult<object?>(Results.BadRequest("Episode duration must be positive"));

        if (dto.AiredFrom is not null && dto.AiredTo is not null && dto.AiredFrom > dto.AiredTo) return ValueTask.FromResult<object?>(Results.BadRequest("Start date cannot be after end date"));

        return next(context);
    }
}
