# Angular.Test.Web

A modern ASP.NET Core web application with Angular frontend, demonstrating file upload/download functionality and weather forecast data visualization.

## Overview

This project is a full-stack web application built with:
- **Backend**: ASP.NET Core 9.0 (RESTful API)
- **Frontend**: Angular 19.1 (Standalone Components)
- **UI Framework**: Bootstrap 5.3
- **TypeScript**: 5.6

The application features:
- 📁 **File Management**: Upload, download, and delete files through a web interface
- 🌤️ **Weather Forecast**: Display sample weather data
- 🔢 **Counter**: Simple interactive counter component
- 📊 **Data Fetching**: Demonstrates API integration patterns

## Prerequisites

- [.NET 9.0 SDK](https://dotnet.microsoft.com/download/dotnet/9.0) or later
- [Node.js 18+](https://nodejs.org/) and npm
- A modern web browser

## Dependencies

**Important**: This application requires the backend file management service to be running:
- **Service Repository**: [FN.FileManagement](https://github.com/mf-rl/FN.FileManagement)
- The file upload/download features depend on this API service being available at the configured API base URL

### Configure API Base URL

The API base URL is configured in the Angular environment files:
- **Development**: `ClientApp/src/environments/environment.ts`
- **Production**: `ClientApp/src/environments/environment.prod.ts`

Default configuration:
```typescript
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost/FN.Testing.WebApi/api'
};
```

Update the `apiBaseUrl` property to match your FN.FileManagement service deployment.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mf-rl/Angular.Test.Web.git
cd Angular.Test.Web
```

### 2. Install Dependencies

```bash
cd Angular.Test.Web/ClientApp
npm install
cd ../..
```

### 3. Run the Application

#### Option A: Run Both Servers Separately (Recommended for Development)

**Terminal 1 - Start Angular Dev Server:**
```bash
cd Angular.Test.Web/ClientApp
npm start
```
The Angular app will be available at http://localhost:4200

**Terminal 2 - Start .NET Backend:**
```bash
cd Angular.Test.Web
dotnet run
```
The .NET backend will be available at:
- HTTPS: https://localhost:5001
- HTTP: http://localhost:5000

When both are running, navigate to **https://localhost:5001** to access the full application through the .NET backend with SPA proxy.

#### Option B: Production Build

```bash
cd Angular.Test.Web/ClientApp
npm run build
cd ..
dotnet run
```

### 4. Trust the Development Certificate (Optional)

If you see certificate warnings:
```bash
dotnet dev-certs https --trust
```

## Project Structure

```
Angular.Test.Web/
├── Angular.Test.Web/              # ASP.NET Core Backend
│   ├── Controllers/               # API Controllers
│   │   └── WeatherForecastController.cs
│   ├── Pages/                     # Razor Pages
│   ├── Properties/                # Launch settings
│   ├── ClientApp/                 # Angular Frontend
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── counter/       # Counter component
│   │   │   │   ├── fetch-data/    # Weather forecast component
│   │   │   │   ├── file-uploads/  # File management component
│   │   │   │   ├── home/          # Home page component
│   │   │   │   └── nav-menu/      # Navigation component
│   │   │   ├── assets/            # Static assets
│   │   │   └── environments/      # Environment configs
│   │   ├── angular.json           # Angular CLI configuration
│   │   ├── package.json           # npm dependencies
│   │   └── tsconfig.json          # TypeScript configuration
│   ├── Program.cs                 # Application entry point
│   └── Angular.Test.Web.csproj    # Project file
└── README.md
```

## Features

### File Upload/Download
- Upload files (JPG format supported)
- View uploaded files list with metadata
- Download files
- Delete files
- Progress tracking during upload

### Weather Forecast
- Fetches weather data from the backend API
- Displays temperature in Celsius and Fahrenheit
- Shows weather summary

### Navigation
- Responsive navigation menu using Bootstrap
- Mobile-friendly hamburger menu

## Technology Stack

### Backend
- ASP.NET Core 9.0
- C# with nullable reference types enabled
- Minimal API pattern
- SpaServices for Angular integration

### Frontend
- Angular 19.1 with standalone components
- TypeScript 5.6
- RxJS 7.8
- Bootstrap 5.3
- ng-bootstrap 18.0

### Build Tools
- Angular CLI 19.1
- esbuild (via Angular CLI)
- Karma + Jasmine for testing

## API Endpoints

### Local API
- `GET /weatherforecast` - Returns weather forecast data

### External API (requires FN.FileManagement service)
- `GET /api/Uploads` - List uploaded files
- `POST /api/Uploads` - Upload a file
- `GET /api/Uploads/download/{id}` - Download a file
- `DELETE /api/Uploads/{id}` - Delete a file

## Changelog

### Version 2.0.0 (January 2026) - Major Upgrade

#### Backend Upgrades
- ⬆️ Upgraded from .NET 5.0 to .NET 9.0
- 🔄 Migrated from `Startup.cs` pattern to minimal API pattern in `Program.cs`
- ✨ Enabled implicit usings for cleaner code
- 🛡️ Enabled nullable reference types
- 📦 Updated `Microsoft.AspNetCore.SpaServices.Extensions` from 5.0.4 to 9.0.0
- 🔧 Fixed nullable reference warnings in models

#### Frontend Upgrades
- ⬆️ Upgraded Angular from 8.2.12 to 19.1.0 (11 major versions!)
- 🏗️ Migrated to standalone components architecture (removed NgModule)
- ⬆️ Upgraded TypeScript from 3.5.3 to 5.6.3
- 🎨 Updated Bootstrap from 4.6.0 to 5.3.3
- 📦 Updated @ng-bootstrap/ng-bootstrap from 9.0.1 to 18.0.0
- 📚 Updated RxJS from 6.6.3 to 7.8.1
- 🔄 Updated Zone.js from 0.9.1 to 0.15.0
- 🧪 Updated Karma from 5.2.3 to 6.4.4
- ✅ Updated Jasmine from 3.5.0 to 5.4.0
- 🔨 Migrated from `@angular-devkit/build-angular:browser` to `:application` builder
- 🗑️ Removed deprecated packages and files (tslint, protractor, etc.)
- ⚙️ Updated karma configuration to use karma-coverage instead of karma-coverage-istanbul-reporter

#### Removed/Deprecated
- ❌ Removed `app.module.ts` and `app.server.module.ts` (migrated to standalone)
- ❌ Removed `tslint.json` (tslint deprecated)
- ❌ Removed `tsconfig.server.json` (no longer needed)
- ❌ Removed obsolete polyfills
- ❌ Removed jQuery dependency
- ❌ Removed Popper.js dependency
- ❌ Removed oidc-client dependency

#### Configuration Changes
- 📝 Updated `.gitignore` to exclude `.vs/` and `.vscode/` folders
- ⚙️ Updated `angular.json` for new builder architecture
- 📋 Updated `tsconfig.json` with modern compiler options
- 🔧 Updated `karma.conf.js` for latest testing tools

### Version 1.0.0 (Original)
- Initial release with .NET 5.0 and Angular 8
- Basic file upload/download functionality
- Weather forecast demo
- Counter component

## Development

### Run Tests

```bash
cd Angular.Test.Web/ClientApp
npm test
```

### Lint

```bash
cd Angular.Test.Web/ClientApp
npm run lint
```

### Build for Production

```bash
cd Angular.Test.Web/ClientApp
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is for demonstration purposes.

## Related Projects

- [FN.FileManagement](https://github.com/mf-rl/FN.FileManagement) - Backend file management service (required dependency)
