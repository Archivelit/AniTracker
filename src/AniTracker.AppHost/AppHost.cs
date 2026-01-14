var builder = DistributedApplication.CreateBuilder(args);

var sqlServer = builder.AddSqlServer("sql-server")
                       .WithLifetime(ContainerLifetime.Persistent);

var apiDb = sqlServer.AddDatabase("api-database");

var backendApi = builder.AddProject<Projects.AniTracker_Api>("api")
                        .WithHttpHealthCheck("/health")
                        .WithReference(apiDb)
                        .WaitFor(apiDb);

builder.Build().Run();
