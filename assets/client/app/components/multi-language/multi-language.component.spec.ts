import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiLanguageComponent } from './multi-language.component';
import { TranslateService, provideTranslateService } from '@ngx-translate/core';

describe('MultiLanguageComponent', () => {
    let component: MultiLanguageComponent;
    let fixture: ComponentFixture<MultiLanguageComponent>;
    let translateService: TranslateService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MultiLanguageComponent],
            providers: [
                provideTranslateService({
                    defaultLanguage: 'de',
                }),
                TranslateService,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(MultiLanguageComponent);
        component = fixture.componentInstance;
        translateService = TestBed.inject(TranslateService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
