namespace AniTracker.Api.Contracts.Validators;

public interface IPasswordValidator
{
    public bool IsValid(string password);
}