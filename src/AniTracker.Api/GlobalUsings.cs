global using AniTracker.Api.Dto;
global using AniTracker.Api.Data;
global using AniTracker.Api.Enums;
global using AniTracker.Api.Models;
global using AniTracker.Api.Helpers;
global using AniTracker.Api.Services;
global using AniTracker.Api.Contracts;
global using AniTracker.Api.Endpoints;
global using AniTracker.Api.Exceptions;
global using AniTracker.Api.Extensions;
global using AniTracker.Api.Middlewares;
global using AniTracker.Api.Models.Dto.User;
global using AniTracker.Api.Endpoints.Filters;
global using AniTracker.Api.Helpers.Validators;
global using AniTracker.Api.Contracts.Validators;
global using AniTracker.Api.Contracts.IdentityServices;
global using AniTracker.ServiceDefaults.Extensions.Hosting;

global using System.Text;
global using System.Security.Claims;
global using System.Linq.Expressions;
global using System.IdentityModel.Tokens.Jwt;

global using Microsoft.IdentityModel.Tokens;
global using Microsoft.EntityFrameworkCore.Query;
global using Microsoft.EntityFrameworkCore;
global using Microsoft.AspNetCore.Authentication.JwtBearer;