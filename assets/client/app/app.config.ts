import { Injector, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AccountsResolver } from './services/accounts-resolver.service';
import {
    TranslateLoader,
    TranslateModule,
    TranslateService,
} from '@ngx-translate/core';
import { customTranslate } from './services/customTranslate.loader';
import { APP_INITIALIZER } from '@angular/core';
import { routes } from './routes';
import { pagesProviders } from './providers/pages.providers';

export function appInitializerFactory(translate: TranslateService) {
    return () => {
        // Disable automatic language detection
        translate.addLangs(['de', 'en']);
        translate.setDefaultLang('de');
        // Force German language regardless of browser settings
        translate.use('de');
        return Promise.resolve();
    };
}

registerLocaleData(localeDe, 'de');
registerLocaleData(localeEn, 'en');

export const appConfig = {
    providers: [
        importProvidersFrom(
            BrowserModule,
            TranslateModule.forRoot({
                useDefaultLang: true,
                loader: {
                    provide: TranslateLoader,
                    useClass: customTranslate,
                    deps: [HttpClient],
                },
            })
        ),
        // Force German locale regardless of browser settings
        { provide: LOCALE_ID, useValue: 'de-DE' },
        { provide: DatePipe, useValue: new DatePipe('de-DE') },
        AccountsResolver,
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializerFactory,
            deps: [TranslateService, Injector],
            multi: true,
        },
        provideHttpClient(),
        provideAnimations(),
        provideRouter(routes),
        ...pagesProviders,
    ],
};
