import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

import { AccountSelectionComponent } from './account-selection.component';
import { RoutePath } from '../../enum/routepath';
import { AccountStorageService } from '../../services/account-storage.service';
import { AccountService } from '../../services/account.service';
import { ApiService } from '../../services/api.service';
import { RouterService } from '../../services/router.service';

describe('AccountSelectionComponent', () => {
    let component: AccountSelectionComponent;
    let fixture: ComponentFixture<AccountSelectionComponent>;
    let accountService: AccountService;
    let routerService: RouterService;
    let route: ActivatedRoute;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            declarations: [AccountSelectionComponent],
            providers: [
                RouterService,
                ActivatedRoute,
                AccountService,
                ApiService,
                AccountStorageService,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AccountSelectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        accountService = TestBed.inject(AccountService);
        routerService = TestBed.inject(RouterService);
        route = TestBed.inject(ActivatedRoute);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set accounts$ observable to the resolved accounts from the route snapshot data', () => {
        const mockAccounts = { accounts: ['Account1', 'Account2'] };
        jest.spyOn(route.snapshot.data, 'accounts').mockReturnValue(
            mockAccounts.accounts
        );

        component.ngOnInit();

        expect(component.accounts$).toEqual(mockAccounts.accounts);
    });

    it('should set the selected account in the account service and navigate to dashboard for the selected account', () => {
        jest.spyOn(accountService, 'setAccount');
        jest.spyOn(routerService, 'navigateToRouteForAccountName');

        component.proceed('John Doe');

        expect(accountService.setAccount).toHaveBeenCalledWith({
            name: 'John Doe',
        });
        expect(
            routerService.navigateToRouteForAccountName
        ).toHaveBeenCalledWith(RoutePath.Dashboard, 'John Doe');
    });

    it('should not set the account and not navigate when no account name is provided', () => {
        jest.spyOn(accountService, 'setAccount');
        jest.spyOn(routerService, 'navigateToRouteForAccountName');

        component.proceed('');

        expect(accountService.setAccount).not.toHaveBeenCalled();
        expect(
            routerService.navigateToRouteForAccountName
        ).not.toHaveBeenCalled();
    });

    it('should not set the account and not navigate when the provided account name does not match any account', () => {
        jest.spyOn(accountService, 'setAccount');
        jest.spyOn(routerService, 'navigateToRouteForAccountName');

        component.proceed('Jane Doe');

        expect(accountService.setAccount).not.toHaveBeenCalled();
        expect(
            routerService.navigateToRouteForAccountName
        ).not.toHaveBeenCalled();
    });

    it('should not set the account and not navigate when the provided account name is null or undefined', () => {
        jest.spyOn(accountService, 'setAccount');
        jest.spyOn(routerService, 'navigateToRouteForAccountName');

        component.proceed(null);
        component.proceed(undefined);

        expect(accountService.setAccount).not.toHaveBeenCalled();
        expect(
            routerService.navigateToRouteForAccountName
        ).not.toHaveBeenCalled();
    });
});
