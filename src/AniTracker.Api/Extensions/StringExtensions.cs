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
        try 
        {
            var addr = new System.Net.Mail.MailAddress(email);
            return addr.Address == trimmedEmail;
        }
        catch 
        {
            return false;
        }
    }
}