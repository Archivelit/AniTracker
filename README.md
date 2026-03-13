# **AniTracker**

![License](https://img.shields.io/badge/license-MIT-green) ![Github Actions](https://github.com/Archivelit/AniTracker/workflows/Build/badge.svg) ![Version](https://img.shields.io/badge/version-10.0.0-blue)

Web app to track anime/films/series you want.

## **Note**

The current version of the project has minimal frontend. Only web API is done. This section will be updated on the first release.

# **Quickstart**

1. Ensure you have `.NET 10` and `Docker` installed.
2. Ensure `Docker` is running.
3. Copy the git repository using

```bash
git clone https://github.com/Archivelit/AniTracker.git
```

4. Go to the `src/AniTracker.AppHost/src` directory

```bash
cd ./AniTracker/src/AniTracker.AppHost/src
```

5. Run the .NET app

```bash
dotnet run -c Debug
```

6. Open the `http://localhost:3000/` in your web browser. **(This is the default frontend host address, not finished yet)**

## **API Endpoints**

**The API uses OpenApi, checkout&#x20;**`Program.cs`**&#x20;for more info.**

### **Authentication**

#### **Login**

`POST /users/login`

Authenticate the user and return a JWT token.

#### **Request Body**

```json
{
  "email": "string",
  "password": "string"
}
```

#### **Responses**

| Status        | Description                                  |
| ------------- | -------------------------------------------- |
| 200 OK        | Authentication successful, returns JWT token |
| 400 Bad       | Request Wrong password                       |
| 404 Not Found | User with provided email not found           |

### **Current User (/me)**

**All endpoints require authentication via a cookie token.**

#### **Get Current User**

`GET /me`

Returns the authenticated user.

| Status          | Description                     |
| --------------- | ------------------------------- |
| 200 OK          | Returns user                    |
| 400 Bad Request | Invalid token or user not found |

#### **Example Response**

```json
{
  "id": "guid",
  "username": "string",
  "email": "string"
}
```

#### **Update Current User**

`PATCH /me`

Updates the current user.

#### **Request Body**

```json
{
  "username": "string?",
  "email": "string?",
  "password": "string?"
}
```

**All fields are optional.**

#### **Responses**

| Status          | Description    |
| --------------- | -------------- |
| 204 No Content  | User updated   |
| 400 Bad Request | Invalid token  |
| 404 Not Found   | User not found |

### **Delete Current User**

`DELETE /me`

Deletes the authenticated user.

| Status          | Description                     |
| --------------- | ------------------------------- |
| 200 OK          | User deleted                    |
| 400 Bad Request | Invalid token or user not found |
| 404 Not Found   | Media Get Media List            |

### **Medias (/medias)**

`GET /medias`

Returns a list of media.

#### **Query Parameters**

| Name  | Type | Default | Description                               |
| ----- | ---- | ------- | ----------------------------------------- |
| count | int  | 10      | Number of media records to return (1–100) |

#### **Responses**

| Status          | Description   |
| --------------- | ------------- |
| 200 OK          | List of media |
| 400 Bad Request | Invalid count |

#### **Example Response**

```json
[ 
	{ 
	"id": "guid", 
	"title": "string", 
	"episodes": 12,
	"synopsis": "string", 
	"airedFrom": "date", 
	"airedTo": "date", 
	"status": "string" 
	} 
]
```

#### **Get Media By Id**

`GET /medias/{id}`

#### **Path Parameters**

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| id   | guid | 10      | Media ID    |

#### **Responses**

| Status        | Description     |
| ------------- | --------------- |
| 200 OK        | Media returned  |
| 404 Not Found | Media not found |

#### **Register Media**

`POST /medias`

Creates a new media entry.

#### **Request Body**

```json
{ 
	"title": "string", 
	"episodes": 12, 
	"synopsis": "string", 
	"airedFrom": "date", 
	"airedTo": "date", 
	"status": "string" 
} 
```

#### **Responses**

| Status          | Description                     |
| --------------- | ------------------------------- |
| 201 Created     | Media created                   |
| 400 Bad Request | Invalid token or user not found |
| 404 Not Found   | Media Get Media List            |

## **Example Response**

```json
{
	"id": "guid", 
	"title": "string", 
	"episodes": 12, 
	"synopsis": "string" 
}
```

#### **Update Media**

`PATCH /medias/{id}`

Updates a media entry.

#### Path Parameters 

| Name | Type | Description |
| ---- | ---- | ----------- |
| id   | guid | Media ID    |

#### Request Body

All fields optional.

```json
{
	"title": "string?", 
	"episodes": 12, 
	"synopsis": "string?", 
	"episodeDurationInTicks": 0, 
	"airedFrom": "date?", 
	"airedTo": "date?", 
	"status": "string?" 
}
```

#### Responses 

| Status         | Description          |
| -------------- | -------------------- |
| 204 No Content | Media updated        |
| 404 Not Found  | Media does not exist |

### User Media (/me/medias)

Media tracked by the authenticated user.

#### Get User Media List

`GET /me/medias`

Returns all media tracked by the user.

#### Responses Status 

| Status          | Description                  |
| --------------- | ---------------------------- |
| 200 OK          | List of user media           |
| 400 Bad Request | Invalid token Get User Media |

#### Get User Media

`GET /me/medias/{mediaId}`

Returns a specific user-media entry.

#### Path Parameters 

| Name    | Type | Description   |
| ------- | ---- | ------------- |
| mediaId | guid | User media ID |

Name Type Description 

#### Responses Status

| Status          | Description         |
| --------------- | ------------------- |
| 200 OK          | User media returned |
| 400 Bad Request | Invalid token       |

#### Add Media To User

`POST /me/medias/{mediaId}`

Adds media to the user's list.

#### Path Parameters

| Name    | Type | Description   |
| ------- | ---- | ------------- |
| mediaId | guid | User media ID |

#### Responses Status

| Status          | Description   |
| --------------- | ------------- |
| 201 Created     | Media added   |
| 400 Bad Request | Invalid token |

#### Update User Media

`PATCH /me/medias/{mediaId}`

Updates user's media entry.

#### Request Body 

```json
{
	"status": "string?", 
	"rating": 0, 
	"episodesWatched": 0, 
	"startDate": "date?", 
	"completedDate": "date?", 
	"isFavorite": true
} 
```

#### Responses Status

| Status          | Description          |
| --------------- | -------------------- |
| 200 OK          | Updated              |
| 400 Bad Request | Invalid token        |
| 404 Not Found   | User media not found |

#### Delete User Media

`DELETE /me/medias/{mediaId}`

Removes media from user's list.

#### Responses Status

| Status          | Description     |
| --------------- | --------------- |
| 200 OK          | Deleted         |
| 400 Bad Request | Invalid token   |
| 404 Not Found   | Media not found |

### Authentication

The API uses JWT stored in a cookie named `token`.

# **Contributing**

Check CONTRIBUTING.md if you want to help developing this product.
