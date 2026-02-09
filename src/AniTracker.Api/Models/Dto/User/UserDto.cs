namespace AniTracker.Api.Models;

public record UserDto(Guid Id, string Email, string Username)
{
    public UserDto(User user) : this(user.Id, user.Email, user.Username) { }
}
