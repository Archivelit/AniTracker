namespace AniTracker.Api.Endpoints.Filters;

// TODO: Implement user media validation
public class UpdateUserMediaValidationFilter : IEndpointFilter
{
    public UpdateUserMediaValidationFilter() { }

    public ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext invocationContext,
        EndpointFilterDelegate next)
    {
        if (invocationContext.Arguments[0] is not UpdateUserMediaDto updateUserMediaDto)
            return ValueTask.FailValidation("Invalid model received");

        return next(invocationContext);
    }
}