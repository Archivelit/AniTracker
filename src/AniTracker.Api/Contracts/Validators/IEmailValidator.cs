namespace AniTracker.Api.Contracts.Validators;

public interface IEmailValidator
{
    public bool IsValid(string email);
}