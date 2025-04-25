import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BalanceOverviewComponent } from './balance-overview.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AccountService } from '../../services/account.service';
import { BehaviorSubject, of } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ConfettiService } from '../../services/confetti.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Component } from '@angular/core';
import { RouteId } from '../../enum/route-id';
import { RouterService } from '../../services/router.service';
import { Account } from '../../types/account';
import { mockRouter } from '../../testing/mocks/router.mock';
import { setupMockLocalStorage } from '../../testing/mocks/account-storage.mock';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { expect, describe, beforeEach, it } from '@jest/globals';

@Component({
    selector: 'money-sprouts-page-header',
    template: '<div></div>',
    standalone: true,
})
class MockPageHeaderComponent {}

describe('BalanceOverviewComponent', () => {
    let component: BalanceOverviewComponent;
    let fixture: ComponentFixture<BalanceOverviewComponent>;
    let mockAccountService: any;
    let mockAccount: Account;
    let currentAccountSubject: BehaviorSubject<Account | null>;
    let mockRouterService: Partial<RouterService>;

    beforeEach(async () => {
        mockAccount = {
            id: 1,
            name: 'Test Account',
            user: 'test-user',
            balance: 1000,
            allowance: 500,
            avatar: {
                id: 1,
                url: 'test-avatar',
            },
            nextPayday: new Date(),
            firstPayday: new Date(),
        };

        mockRouterService = {
            navigateToRoute: jest.fn(),
            navigateToAccountDashboard: jest.fn(),
        };

        currentAccountSubject = new BehaviorSubject<Account | null>(mockAccount);
        setupMockLocalStorage(mockAccount);

        mockAccountService = {
            currentAccount$: currentAccountSubject.asObservable(),
            getCurrentAccount: jest.fn().mockReturnValue(mockAccount),
            getAvatarForAccount: jest.fn().mockReturnValue('test-avatar'),
            refreshAccount: jest.fn(),
            loading: new BehaviorSubject<boolean>(false),
        };

        await TestBed.configureTestingModule({
            imports: [TranslateModule.forRoot(), RouterModule, BalanceOverviewComponent, MockPageHeaderComponent],
            providers: [
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
                {
                    provide: AccountService,
                    useValue: mockAccountService,
                },
                { provide: Router, useValue: mockRouter },
                { provide: RouterService, useValue: mockRouterService },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            data: {
                                routeId: RouteId.Balance,
                            },
                        },
                        firstChild: null,
                        params: of({}),
                        queryParams: of({}),
                        fragment: of(null),
                        data: of({}),
                        url: of([]),
                        paramMap: of(new Map()),
                        queryParamMap: of(new Map()),
                    },
                },
                DatePipe,
                ConfettiService,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(BalanceOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get current account', () => {
        expect(component.account$).toBeDefined();
        expect(component.account$).toBeTruthy();
    });

    it('should get avatar for account', () => {
        expect(mockAccountService.getAvatarForAccount).toHaveBeenCalledWith(mockAccount);
    });

    it('should get funny image', () => {
        const balance = 100;
        const imagePath = component.getFunnyImage(balance);
        expect(imagePath).toBeTruthy();
    });
});
