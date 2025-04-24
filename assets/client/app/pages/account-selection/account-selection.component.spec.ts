import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Account } from '@money-sprouts/shared/domain';
import { AccountService } from '../../services/account.service';
import { RouterService } from '../../services/router.service';
import { AccountSelectionComponent } from './account-selection.component';
import { SharedModule } from '../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

describe('AccountSelectionComponent', () => {
    let component: AccountSelectionComponent;
    let fixture: ComponentFixture<AccountSelectionComponent>;
    let mockAccountService: jest.Mocked<AccountService>;
    let mockRouterService: jest.Mocked<RouterService>;
    let mockAccounts: Account[];
    let mockActivatedRoute;

    beforeEach(async () => {
        jest.useFakeTimers();
        mockAccountService = { setAccount: jest.fn() } as any;
        mockRouterService = { navigateToRouteForAccountName: jest.fn() } as any;
        mockAccounts = [
            { name: 'Account1', id: 1 },
            { name: 'Account2', id: 2 },
        ];
        mockActivatedRoute = {
            snapshot: {
                data: {
                    accounts: mockAccounts,
                },
            },
        };

        await TestBed.configureTestingModule({
            imports: [SharedModule, TranslateModule.forRoot()],
            declarations: [AccountSelectionComponent],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provide: AccountService, useValue: mockAccountService },
                { provide: RouterService, useValue: mockRouterService },
            ],
        })
            .overrideComponent(AccountSelectionComponent, {
                set: { template: '<div></div>' },
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountSelectionComponent);
        component = fixture.componentInstance;

        // Mock ngOnInit
        jest.spyOn(component, 'ngOnInit').mockImplementation();

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not call ngOnInit automatically', () => {
        expect(component.ngOnInit).not.toHaveBeenCalled();
    });

    it('should initialize accounts$ with accounts from route data on ngOnInit', () => {
        component.ngOnInit();
        let accounts: Account[];
        component.accounts$.subscribe((a) => (accounts = a));
        expect(accounts).toEqual(mockAccounts);
    });

    it('should not proceed when name is not provided', () => {
        component.proceed('');
        jest.runAllTimers();

        expect(mockAccountService.setAccount).not.toHaveBeenCalled();
        expect(
            mockRouterService.navigateToRouteForAccountName
        ).not.toHaveBeenCalled();
    });

    it('should proceed to the dashboard when a valid account name is provided', () => {
        const accountName = 'Account1';
        component.proceed(accountName);
        jest.runAllTimers();

        expect(mockAccountService.setAccount).toHaveBeenCalledWith(
            mockAccounts[0]
        );
        expect(
            mockRouterService.navigateToRouteForAccountName
        ).toHaveBeenCalledWith('account/:name/dashboard', accountName);
    });

    it('should not proceed when an invalid account name is provided', () => {
        component.proceed('InvalidAccount');
        jest.runAllTimers();

        expect(mockAccountService.setAccount).not.toHaveBeenCalled();
        expect(
            mockRouterService.navigateToRouteForAccountName
        ).not.toHaveBeenCalled();
    });
});
