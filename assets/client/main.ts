import 'zone.js';
import '@angular/compiler';
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { environment } from './environments/environments';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideClientHydration } from '@angular/platform-browser';

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    ...appConfig,
    providers: [...appConfig.providers, provideClientHydration()],
}).catch((err) => console.error(err));
