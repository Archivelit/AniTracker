var builder = DistributedApplication.CreateBuilder(args);

var sqlServer = builder.AddSqlServer("sql-server")
                       .WithLifetime(ContainerLifetime.Persistent);

var apiDb = sqlServer.AddDatabase("api-database");

var backendApi = builder.AddProject<Projects.AniTracker_Api>("api")
                        .WithHttpHealthCheck("/health")
                        .WithReference(apiDb)
                        .WaitFor(apiDb);

var frontend = builder.AddJavaScriptApp("frontend", "../AniTracker.Frontend/src/", "dev")
                      .WithReference(backendApi)
                      .WithPnpm()
                      .WithHttpEndpoint(3000, 3000, isProxied: false);

builder.Build().Run();
