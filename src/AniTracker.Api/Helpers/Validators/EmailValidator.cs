namespace AniTracker.Api.Helpers.Validators;

public class EmailValidator : IEmailValidator
{
    public bool IsValid(string email) => email.IsValidEmail();
}