### Restaurant App (Ionic + Angular + Capacitor)

An Ionic Angular application for a restaurant, featuring a browsable menu and a shopping cart, with Capacitor for native builds.

### Features
- **Menu browsing**: View available dishes via `pages/menu`.
- **Cart management**: Add, remove, and track items via `pages/cart` and `shared/services/cart.ts`.
- **Reusable services**: Common utilities in `shared/services/utility.service.ts` and storage utilities via `@ionic/storage`.
- **Ionic UI**: Mobile-first UI using `@ionic/angular` and `ionicons`.
- **Native packaging**: Capacitor Android project in `android/` and web output in `www/`.

### Tech Stack
- **Framework**: Angular 20, Ionic 8
- **Runtime**: Capacitor 7
- **Languages**: TypeScript, SCSS
- **Tooling**: Angular CLI, ESLint, Jasmine/Karma

### Quick Start
```bash
# 1) Install dependencies
npm install

# 2) Run in the browser (dev)
npm start

# 3) Lint and test
npm run lint
npm test

# 4) Build for production (outputs to www/)
npm run build
```

#### Android (Capacitor)
```bash
# After building the web app, sync native platform
npx cap sync android

# Open Android Studio
npx cap open android
```

### Available NPM Scripts
- **start**: `ng serve` (dev server)
- **build**: `ng build` (production by default per `angular.json`)
- **watch**: `ng build --watch --configuration development`
- **test**: `ng test` (Karma + Jasmine)
- **lint**: `ng lint` (ESLint via angular-eslint)

### Project Structure
```text
Resturant/
  android/                # Capacitor Android native project
  src/
    app/
      app.component.*     # Root Ionic component
      app.routes.ts       # Standalone Angular routes
      core/               # Cross-cutting concerns
        constants/
        guards/
        interfaces/
        pipes/
      pages/
        menu/             # Menu page (list of dishes)
        cart/             # Cart page (selected items)
      shared/
        components/       # Reusable UI components (if any)
        services/
          cart.ts         # Cart state/service
          utility.service.ts
    assets/               # Static assets (icons, images)
    environments/         # `environment.ts` and prod variant
    theme/                # Ionic variables (SCSS)
    global.scss           # Global styles
    main.ts               # App bootstrap (browser)
    polyfills.ts
  www/                    # Build output (web assets)
  angular.json            # Angular workspace config
  capacitor.config.ts     # Capacitor configuration
  ionic.config.json       # Ionic CLI config
  package.json            # Scripts and dependencies
```

### Routing
- Uses Angular standalone configuration with routes defined in `src/app/app.routes.ts`.

### Environments
- Edit `src/environments/environment.ts` for dev and `environment.prod.ts` for production.

### Styling
- SCSS with global styles in `src/global.scss` and Ionic variables in `src/theme/variables.scss`.

### Build Output
- The Angular build outputs to `www/` (configured in `angular.json`). Capacitor consumes this for native builds.

### Notes
- For native testing and release builds, manage signing and build variants from Android Studio after `npx cap open android`.

---

### Screenshots
Add images under `docs/screenshots/` and reference them here.

```md
![Menu](docs/screenshots/menu.png)
![Cart](docs/screenshots/cart.png)
```

### API
This template does not include a remote API by default. To add one, configure your base URL in environment files and use it inside services.

1) Add a base URL to environments
```ts
// src/environments/environment.ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3000/api'
};
```
```ts
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiBaseUrl: 'https://your-domain.com/api'
};
```

2) Use in a service
```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  getMenu() {
    return this.http.get(`${this.baseUrl}/menu`);
  }
}
```

3) Add `HttpClientModule` if needed
```ts
// main.ts (standalone bootstrap) or in the root provider array
import { provideHttpClient } from '@angular/common/http';
bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()]
});
```

### Deployment

#### Web (Static Hosting)
- Build: `npm run build` (outputs to `www/`).
- Deploy the `www/` folder to any static host (Nginx, Apache, S3+CloudFront, Netlify, Vercel).

Netlify (example):
- Build command: `npm run build`
- Publish directory: `www`

Vercel (example):
- Framework preset: Other
- Build command: `npm run build`
- Output directory: `www`

#### Android (Capacitor)
1) Build web assets: `npm run build`
2) Sync: `npx cap sync android`
3) Open Android Studio: `npx cap open android`
4) Build debug or generate a signed release (Build > Generate Signed Bundle/APK)

Release tips:
- Update app id, name, and version in `android/app/src/main/AndroidManifest.xml` and Gradle files as needed.
- Keep `www/` in sync by rebuilding before release.
