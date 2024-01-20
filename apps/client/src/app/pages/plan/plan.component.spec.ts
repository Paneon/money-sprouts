import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanComponent } from './plan.component';
import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({
    selector: 'money-sprouts-page-header',
    template: '<div></div>',
})
class MockPageHeaderComponent {}

describe('PlanComponent', () => {
    let component: PlanComponent;
    let fixture: ComponentFixture<PlanComponent>;
    let accountService: AccountService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [PlanComponent, MockPageHeaderComponent],
            providers: [AccountService],
        }).compileComponents();

        fixture = TestBed.createComponent(PlanComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        accountService = TestBed.inject(AccountService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
