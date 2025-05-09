import { Injector, LOCALE_ID, importProvidersFrom, inject, provideAppInitializer } from '@angular/core';
import {
    provideRouter,
    withDebugTracing,
    withInMemoryScrolling,
    withRouterConfig,
    withNavigationErrorHandler,
    NavigationError,
} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';

import { customTranslate } from './services/customTranslate.loader';
import { routes } from './routes';
import { pagesProviders } from './providers/pages.providers';

function navigationErrorHandler(error: NavigationError): void {
    console.error('Navigation Error:', error);
}

registerLocaleData(localeDe, 'de');
registerLocaleData(localeEn, 'en');

export const appConfig = {
    providers: [
        importProvidersFrom(BrowserModule),
        provideTranslateService({
            defaultLanguage: 'de',
            loader: {
                provide: TranslateLoader,
                useClass: customTranslate,
                deps: [HttpClient],
            },
        }),
        { provide: LOCALE_ID, useValue: 'de-DE' },
        { provide: DatePipe, useValue: new DatePipe('de-DE') },
        provideHttpClient(),
        provideAnimations(),
        provideRouter(
            routes,
            withDebugTracing(),
            withInMemoryScrolling({
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
            }),
            withRouterConfig({
                onSameUrlNavigation: 'reload',
                paramsInheritanceStrategy: 'always',
                urlUpdateStrategy: 'deferred',
                canceledNavigationResolution: 'replace',
            }),
            withNavigationErrorHandler(navigationErrorHandler),
        ),
        ...pagesProviders,
    ],
};
