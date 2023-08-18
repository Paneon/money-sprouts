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
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountResolver } from './services/users-resolver.service';

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
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'de' },
        { provide: DatePipe, useValue: new DatePipe('de-DE') },
        AccountResolver,
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
