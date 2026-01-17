namespace AniTracker.Api.Helpers.Validators;

public class TitleValidator : ITitleValidator
{
    public bool IsValid(string title) => title.Length < 3 || !title.Any(char.IsLetter);
}