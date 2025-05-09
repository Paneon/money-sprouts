import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateService, provideTranslateService } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router, provideRouter } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';
import { expect, describe, beforeEach, it } from '@jest/globals';
import { setupMockLocalStorage } from './testing/mocks/account-storage.mock';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let translateService: TranslateService;
    let router: Router;

    beforeEach(async () => {
        setupMockLocalStorage();

        await TestBed.configureTestingModule({
            imports: [AppComponent, NoopAnimationsModule],
            providers: [
                provideTranslateService({
                    defaultLanguage: 'de',
                }),
                provideRouter([
                    {
                        path: 'account/:name/dashboard',
                        component: AppComponent,
                        data: { animation: 'dashboard' },
                    },
                ]),
                provideLocationMocks(),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        translateService = TestBed.inject(TranslateService);
        router = TestBed.inject(Router);

        fixture.detectChanges();
    });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    it('should have correct title', () => {
        expect(component.title).toBe('Money Pig');
    });

    it('should set default language to German', () => {
        expect(translateService.getDefaultLang()).toBe('de');
    });

    it('should use German language for translations', () => {
        expect(translateService.currentLang).toBe('de');
    });
});
