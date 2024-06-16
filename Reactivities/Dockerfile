FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

#copy .csproj and restore as distinct layers
COPY "Reactivities/Reactivities.sln" "Reactivities/Reactivities.sln"
COPY "Reactivities/API/API.csproj" "Reactivities/API/API.csproj"
COPY "Reactivities/Application/Application.csproj" "Reactivities/Application/Application.csproj"
COPY "Reactivities/Persistence/Persistence.csproj" "Reactivities/Persistence/Persistence.csproj"
COPY "Reactivities/Domain/Domain.csproj" "Reactivities/Domain/Domain.csproj"
COPY "Reactivities/Infrastructure/Infrastructure.csproj" "Reactivities/Infrastructure/Infrastructure.csproj"

RUN dotnet restore "Reactivities/Reactivities.sln"

#copy everything else and build
COPY . .
WORKDIR /app
RUN dotnet publish Reactivities/Reactivities.sln -c Release -o out 

#build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT [ "dotnet","API.dll" ]



