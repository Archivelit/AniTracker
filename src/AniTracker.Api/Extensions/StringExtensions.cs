namespace AniTracker.Api.Extensions;

public static class StringExtensions
{
    internal static bool IsValidEmail(this string email)
    {
        if (string.IsNullOrWhiteSpace(email))
            return false;
        
        var trimmedEmail = email.Trim();

        if (trimmedEmail.EndsWith("."))
            return false;

        var successful = System.Net.Mail.MailAddress.TryCreate(trimmedEmail, out var addr);
        
        return successful && addr!.Address == trimmedEmail;
    }
}