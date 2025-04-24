import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let translateService: TranslateService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                AppComponent,
                TranslateModule.forRoot(),
                RouterTestingModule,
                NoopAnimationsModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        translateService = TestBed.inject(TranslateService);
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
