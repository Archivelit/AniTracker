namespace AniTracker.Api.Helpers.Validators;

public class PasswordValidator : IPasswordValidator
{
    public bool IsValid(string password)
    {
        if (password.Length < 8)
            return false;

        return password.Any(char.IsLower) 
               && password.Any(char.IsDigit) 
               && password.Any(char.IsUpper) 
               && password.Any(char.IsSymbol);
    }
}