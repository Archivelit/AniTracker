namespace AniTracker.Api.Endpoints.Filters;

// TODO: Implement user media validation
public class UpdateUserMediaValidationFilter : IEndpointFilter
{
    private const string InvalidModelMessage = "Invalid model or data";

    public UpdateUserMediaValidationFilter() { }

    public ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext invocationContext,
        EndpointFilterDelegate next)
    {
        if (invocationContext.Arguments[0] is not UpdateUserMediaDto updateUserMediaDto)
        {
            return BadRequest(InvalidModelMessage);
        }

        return IsValidDto(updateUserMediaDto)
            ? next(invocationContext)
            : BadRequest(InvalidModelMessage);
    }

    private bool IsValidDto(UpdateUserMediaDto dto) => true;

    private static ValueTask<object?> BadRequest(string message) => ValueTask.FromResult<object?>(Results.BadRequest(message));
}