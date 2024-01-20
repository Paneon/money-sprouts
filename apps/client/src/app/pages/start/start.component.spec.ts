import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StartComponent } from './start.component';
import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'money-sprouts-multilanguage',
    template: '<div></div>',
})
class MockMultilanguageComponent {}

class MockTranslateService {
    currentLang = 'en';
}

describe('StartComponent', () => {
    let component: StartComponent;
    let fixture: ComponentFixture<StartComponent>;
    let translateService: MockTranslateService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TranslateModule.forRoot()],
            declarations: [StartComponent, MockMultilanguageComponent],
            providers: [
                { provide: TranslateService, useClass: MockTranslateService },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(StartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        translateService = TestBed.inject(MockTranslateService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
