import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StartComponent } from './start.component';
import { TranslateModule } from '@ngx-translate/core';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { setupMockLocalStorage } from '../../testing/mocks/account-storage.mock';
import { provideRouter } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';

@Component({
    selector: 'money-sprouts-multilanguage',
    template: '<div></div>',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class MockMultilanguageComponent {}

describe('StartComponent', () => {
    let component: StartComponent;
    let fixture: ComponentFixture<StartComponent>;

    beforeEach(async () => {
        setupMockLocalStorage();

        await TestBed.configureTestingModule({
            imports: [TranslateModule.forRoot(), StartComponent, MockMultilanguageComponent],
            providers: [provideRouter([{ path: 'login', component: StartComponent }]), provideLocationMocks()],
        }).compileComponents();

        fixture = TestBed.createComponent(StartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
