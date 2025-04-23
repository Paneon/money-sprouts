import { AppComponent } from './app.component';
import {
    CUSTOM_ELEMENTS_SCHEMA,
    DoBootstrap,
    Injector,
    LOCALE_ID,
    importProvidersFrom,
} from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { Router, RouterModule, provideRouter } from '@angular/router';
import { PagesModule } from './pages/pages.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing.module';
import {
    HttpClient,
    HttpClientModule,
    provideHttpClient,
} from '@angular/common/http';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import {
    BrowserAnimationsModule,
    provideAnimations,
} from '@angular/platform-browser/animations';
import { AccountsResolver } from './services/accounts-resolver.service';
import {
    TranslateLoader,
    TranslateModule,
    TranslateService,
} from '@ngx-translate/core';
import { customTranslate } from './services/customTranslate.loader';
import { APP_INITIALIZER } from '@angular/core';

export function appInitializerFactory(translate: TranslateService) {
    return () => {
        translate.setDefaultLang('de');
        return translate.use('de').toPromise();
    };
}

registerLocaleData(localeDe);
registerLocaleData(localeEn);

export const appConfig = {
    providers: [
        importProvidersFrom(
            BrowserModule,
            AppRoutingModule,
            RouterModule,
            PagesModule,
            HttpClientModule,
            CommonModule,
            BrowserAnimationsModule,
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useClass: customTranslate,
                    deps: [HttpClient],
                },
            })
        ),
        { provide: LOCALE_ID, useValue: 'de' },
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
        provideRouter([]),
    ],
};
