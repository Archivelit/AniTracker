
namespace AniTracker.Api.Middlewares;

public class ExceptionMiddleware : IMiddleware
{
    private readonly ILogger<ExceptionMiddleware> _logger;

    public ExceptionMiddleware(ILogger<ExceptionMiddleware> logger) => _logger = logger;

    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context).ConfigureAwait(false);
        }
        catch (Exception ex)
        {
            await ProcessException(context, ex).ConfigureAwait(false);
        }
    }

    private Task ProcessException(HttpContext context, Exception exception)
    {
        _logger.LogError(exception, "Unhandled exception occured");

        return exception switch
        {
            DuplicateException => Results.Conflict(exception.Message).ExecuteAsync(context),
            NotFoundException => Results.NotFound(exception.Message).ExecuteAsync(context),
            _ => Results.InternalServerError().ExecuteAsync(context)
        };
    }
}

public static class ExceptionMiddlewareExtensions
{
    public static IApplicationBuilder UseException(this IApplicationBuilder app) => app.UseMiddleware<ExceptionMiddleware>();
}