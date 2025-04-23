import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let translateService: TranslateService;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                RouterTestingModule,
                TranslateModule.forRoot(),
            ],
            declarations: [AppComponent],
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

    it(`should have as title 'Money Pig'`, () => {
        expect(component.title).toEqual('Money Pig');
    });

    it('should set default language to German', () => {
        expect(translateService.getDefaultLang()).toBe('de');
    });

    it('should use German language for translations', () => {
        expect(translateService.currentLang).toBe('de');
    });

    it('should call initialNavigation on ngOnInit', () => {
        const routerSpy = jest.spyOn(router, 'initialNavigation');
        component.ngOnInit();
        expect(routerSpy).toHaveBeenCalled();
    });
});
