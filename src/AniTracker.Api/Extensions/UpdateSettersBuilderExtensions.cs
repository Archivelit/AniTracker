namespace AniTracker.Api.Extensions;

public static class UpdateSettersBuilderExtensions
{
    public static void UpdateIfNotNull<TSource, TProperty>(this UpdateSettersBuilder<TSource> builder,
    Expression<Func<TSource, TProperty>> propertyExpression, TProperty newValue)
    {
        if (newValue is not null) builder.SetProperty(propertyExpression, newValue);
    }
}
