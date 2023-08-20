import { AppComponent } from './app.component';
import {
    CUSTOM_ELEMENTS_SCHEMA,
    DoBootstrap,
    Injector,
    NgModule,
} from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { SharedModule } from '../shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { PagesModule } from './pages/pages.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersResolver } from './services/users-resolver.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

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
        MatTabsModule,
        MatIconModule,
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'de' },
        { provide: DatePipe, useValue: new DatePipe('de-DE') },
        UsersResolver,
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
