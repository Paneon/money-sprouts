import { AppComponent } from './app.component';
import {
    CUSTOM_ELEMENTS_SCHEMA,
    DoBootstrap,
    Injector,
    LOCALE_ID,
    NgModule,
} from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { SharedModule } from '../shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { PagesModule } from './pages/pages.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountsResolver } from './services/accounts-resolver.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { customTranslate } from './services/customTranslate.loader';
import { APP_INITIALIZER } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export function appInitializerFactory(translate: TranslateService) {
    return () => {
        translate.setDefaultLang('de');
        return translate.use('de').toPromise();
    };
}
registerLocaleData(localeDe);

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        SharedModule,
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
        }),
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'de' },
        { provide: DatePipe, useValue: new DatePipe('de-DE') },
        AccountsResolver,
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializerFactory,
            deps: [TranslateService, Injector],
            multi: true,
        },
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent],
})
export class AppModule implements DoBootstrap {
    constructor(private readonly router: Router, private injector: Injector) {}

    ngDoBootstrap() {
        const app = createCustomElement(AppComponent, {
            injector: this.injector,
        });

        customElements.define('money-sprouts', app);

        this.router.initialNavigation();
    }
}
