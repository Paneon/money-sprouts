import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { BalanceOverviewComponent } from './balance-overview.component';
import { AccountService } from '../../services/account.service';
import { AccountStorageService } from '../../services/account-storage.service';
import { ConfettiService } from '../../services/confetti.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
    selector: 'money-sprouts-page-header',
    template: '<div></div>',
})
class MockPageHeaderComponent {}

describe('BalanceOverviewComponent', () => {
    let component: BalanceOverviewComponent;
    let fixture: ComponentFixture<BalanceOverviewComponent>;
    let accountService: AccountService;
    let translateService: TranslateService;
    let mockAccountStorageService: Partial<AccountStorageService>;
    let mockAccountService: any;

    beforeEach(async () => {
        mockAccountService = {
            currentAccount$: of({
                id: 1,
                name: 'Test Account',
                balance: 100,
                avatar: 'test.png',
                nextPayday: new Date(),
            }),
        };

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
                balance: 100,
                allowance: 2,
                firstPayday: new Date(),
            }),
        };

        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                TranslateModule.forRoot(),
                RouterTestingModule,
            ],
            declarations: [BalanceOverviewComponent, MockPageHeaderComponent],
            providers: [
                {
                    provide: AccountStorageService,
                    useValue: mockAccountStorageService,
                },
                { provide: AccountService, useValue: mockAccountService },
                TranslateService,
                DatePipe,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(BalanceOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        TestBed.inject(AccountStorageService);
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
        expect(component.getFunnyImage(undefined)).toBe(
            './assets/images/3d-dog-and-boy-jumping.png'
        );
        expect(component.getFunnyImage(0)).toBe(
            './assets/images/3d-empty-box.png'
        );
        expect(component.getFunnyImage(100)).toBe(
            './assets/images/3d-cat-in-box.png'
        );
        expect(component.getFunnyImage(250)).toBe(
            './assets/images/3d-cat-in-box.png'
        );
    });

    describe('getFormatedNextPayday', () => {
        it('should handle null date', () => {
            const formattedNextPayday =
                component.getFormatedNextPayday(undefined);
            expect(formattedNextPayday).toBe('');
        });

        it('should format date correctly', () => {
            const testDate = new Date('2024-03-20');
            const formattedNextPayday =
                component.getFormatedNextPayday(testDate);
            expect(formattedNextPayday).toBe('20.03.2024');
        });
    });

    describe('getDaysUntilNextPayday', () => {
        it('should handle null date', () => {
            const daysUntilNextPayday =
                component.getDaysUntilNextPayday(undefined);
            expect(daysUntilNextPayday).toBe(0);
        });

        it('should calculate days correctly', () => {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);

            const daysUntilNextPayday =
                component.getDaysUntilNextPayday(tomorrow);
            expect(daysUntilNextPayday).toBe(1);
        });
    });
});
