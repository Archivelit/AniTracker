var builder = DistributedApplication.CreateBuilder(args);

var backendApi = builder.AddProject<Projects.AniTracker_Api>("api");

builder.Build().Run();
