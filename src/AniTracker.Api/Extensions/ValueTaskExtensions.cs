namespace AniTracker.Api.Extensions;

public static class ValueTaskExtensions
{
    extension (ValueTask)
    {
        public static ValueTask<object?> FailValidation(string message) => ValueTask.FromResult<object?>(Results.UnprocessableEntity(message));
    }
}
