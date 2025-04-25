import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiLanguageComponent } from './multi-language.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('MultiLanguageComponent', () => {
    let component: MultiLanguageComponent;
    let fixture: ComponentFixture<MultiLanguageComponent>;
    let translateService: TranslateService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TranslateModule.forRoot(), MultiLanguageComponent],
            providers: [TranslateService],
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
