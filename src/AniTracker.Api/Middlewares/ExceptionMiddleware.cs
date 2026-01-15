
namespace AniTracker.Api.Middlewares;

public class ExceptionMiddleware : IMiddleware
{
    private readonly ILogger<ExceptionMiddleware> _logger;

    public ExceptionMiddleware(ILogger<ExceptionMiddleware> logger) => _logger = logger;

    public Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            return next(context);
        }
        catch (Exception ex)
        {
            ProcessException(context, ex);
            return Task.CompletedTask;
        }
    }

    private void ProcessException(HttpContext context, Exception exception)
    {
        _logger.LogError(exception, "Unhandled exception occured");

        if (exception is DuplicateException) Results.Conflict(exception.Message).ExecuteAsync(context);
        else Results.InternalServerError().ExecuteAsync(context);
    }
}

public static class ExceptionMiddlewareExtensions
{
    public static IApplicationBuilder UseException(this IApplicationBuilder app) => app.UseMiddleware<ExceptionMiddleware>();
}