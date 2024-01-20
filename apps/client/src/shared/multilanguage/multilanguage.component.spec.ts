import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { MultilanguageComponent } from './multilanguage.component';

class MockTranslateService {
    currentLang = 'en';
}
describe('MultilanguageComponent', () => {
    let component: MultilanguageComponent;
    let fixture: ComponentFixture<MultilanguageComponent>;
    let translateService: MockTranslateService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TranslateModule.forRoot()],
            declarations: [MultilanguageComponent],
            providers: [
                { provide: translateService, useValue: MockTranslateService },
            ],
        });
        fixture = TestBed.createComponent(MultilanguageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
