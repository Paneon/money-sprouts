import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanComponent } from './plan.component';
import { Component } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AccountStorageService } from '../../services/account-storage.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'money-sprouts-page-header',
    template: '<div></div>',
})
class MockPageHeaderComponent {}

describe('PlanComponent', () => {
    let component: PlanComponent;
    let fixture: ComponentFixture<PlanComponent>;
    let mockAccountStorageService: Partial<AccountStorageService>;

    beforeEach(async () => {
        mockAccountStorageService = {
            getCurrentAccount: jest.fn().mockReturnValue({
                id: '1',
                nextPayday: new Date(),
                user: 'jasmine',
                name: 'jasmine',
                avatar: {
                    id: 1,
                    url: 'www.test.de',
                },
                balance: 120,
                allowance: 2,
                firstPayday: new Date(),
            }),
        };

        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, TranslateModule.forRoot()],
            declarations: [PlanComponent, MockPageHeaderComponent],
            providers: [
                {
                    provide: AccountStorageService,
                    useValue: mockAccountStorageService,
                },
            ],
        })
            .overrideComponent(PlanComponent, {
                set: { template: '<div></div>' }, // Use a simplified template
            })
            .compileComponents();

        fixture = TestBed.createComponent(PlanComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
