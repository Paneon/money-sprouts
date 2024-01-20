import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { BalanceOverviewComponent } from './balance-overview.component';
import { AccountService } from '../../services/account.service';
import { fakeAsync, tick, flush } from '@angular/core/testing';

@Component({
    selector: 'money-sprouts-page-header',
    template: '<div></div>',
})
class MockPageHeaderComponent {}

class MockAccountService {
    currentAccount$ = of({
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
    });
    refreshAccount = jest.fn();
}

describe('BalanceOverviewComponent', () => {
    let component: BalanceOverviewComponent;
    let fixture: ComponentFixture<BalanceOverviewComponent>;
    let accountService: AccountService;
    let translateService: TranslateService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, TranslateModule.forRoot()],
            declarations: [BalanceOverviewComponent, MockPageHeaderComponent],
            providers: [AccountService, TranslateService, DatePipe],
        }).compileComponents();

        fixture = TestBed.createComponent(BalanceOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        accountService = TestBed.inject(AccountService);
        translateService = TestBed.inject(TranslateService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set current language on init', () => {
        const currentLang = component['currentLang'];
        expect(currentLang).toBe(translateService.currentLang);
    });

    it('should call refreshAccount when account changes', () => {
        component.account$.subscribe(() => {
            expect(accountService.refreshAccount).toHaveBeenCalled();
        });
    });

    it('should correctly format the next payday date', () => {
        const testDate = new Date(2024, 0, 22); // 22nd January 2024
        translateService.currentLang = 'en'; // Assuming English language for this test

        const formattedNextPayday = component.getFormatedNextPayday(testDate);

        const expectedFormattedDate = 'Monday (22. January 2024)';
        expect(formattedNextPayday).toBe(expectedFormattedDate);
    });

    it('should return a string representing the number of days until next payday', () => {
        const today = new Date();
        const nextPayday = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 5
        );

        const daysUntilNextPayday =
            component.getDaysUntilNextPayday(nextPayday);

        expect(daysUntilNextPayday).toBe('5');
    });

    it('should return a known string if next payday is null for getFormatedNextPayday', () => {
        const formattedNextPayday = component.getFormatedNextPayday(null);
        expect(formattedNextPayday).toBe('OVERVIEW.PAYDAY_WEEKDAY_UNKOWN');
    });

    it('should return a known string if next payday is null for getDaysUntilNextPayday', () => {
        const daysUntilNextPayday = component.getDaysUntilNextPayday(null);
        expect(daysUntilNextPayday).toBe('OVERVIEW.PAYDAY_COUNTER_UNKOWN');
    });
    it('should return correct image path based on balance', () => {
        expect(component.getFunnyImage(0)).toBe(
            './assets/images/3d-empty-box.png'
        );
        expect(component.getFunnyImage(100)).toBe(
            './assets/images/3d-cat-in-box.png'
        );
    });
});
