
namespace AniTracker.Api.Middlewares;

public class ExceptionMiddleware : IMiddleware
{
    private readonly ILogger<ExceptionMiddleware> _logger;

    public ExceptionMiddleware(ILogger<ExceptionMiddleware> logger) => _logger = logger;

    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            await ProcessException(context, ex);
        }
    }

    private Task ProcessException(HttpContext context, Exception exception)
    {
        _logger.LogError(exception, "Unhandled exception occured");

        if (exception is DuplicateException) return Results.Conflict(exception.Message).ExecuteAsync(context);
        else return Results.InternalServerError().ExecuteAsync(context);
    }
}

public static class ExceptionMiddlewareExtensions
{
    public static IApplicationBuilder UseException(this IApplicationBuilder app) => app.UseMiddleware<ExceptionMiddleware>();
}