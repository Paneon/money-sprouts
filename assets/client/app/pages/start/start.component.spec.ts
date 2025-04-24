import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StartComponent } from './start.component';
import { TranslateModule } from '@ngx-translate/core';
import { Component } from '@angular/core';

@Component({
    selector: 'money-sprouts-multilanguage',
    template: '<div></div>',
    standalone: true,
})
class MockMultilanguageComponent {}

describe('StartComponent', () => {
    let component: StartComponent;
    let fixture: ComponentFixture<StartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TranslateModule.forRoot(),
                StartComponent,
                MockMultilanguageComponent,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(StartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
