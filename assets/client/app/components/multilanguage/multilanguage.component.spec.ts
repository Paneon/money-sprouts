import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultilanguageComponent } from './multilanguage.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('MultilanguageComponent', () => {
    let component: MultilanguageComponent;
    let fixture: ComponentFixture<MultilanguageComponent>;
    let translateService: TranslateService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TranslateModule.forRoot(), MultilanguageComponent],
            providers: [TranslateService],
        }).compileComponents();

        fixture = TestBed.createComponent(MultilanguageComponent);
        component = fixture.componentInstance;
        translateService = TestBed.inject(TranslateService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
