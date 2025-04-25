import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionHistoryComponent } from './transaction-history.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { RouterService } from '../../services/router.service';
import { RouteId } from '../../enum/route-id';
import { Account } from '../../types/account';
import { ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { mockRouter } from '../../testing/mocks/router.mock';
import { MockPageHeaderComponent } from '../../testing/mocks/components/mock-page-header.component';

describe('TransactionHistoryComponent', () => {
    let component: TransactionHistoryComponent;
    let fixture: ComponentFixture<TransactionHistoryComponent>;
    let mockAccountService: any;
    let mockRouterService: any;
    let mockAccount: Account;
    let mockSnapshot: ActivatedRouteSnapshot;
    let mockParamMap: any;

    beforeEach(async () => {
        mockAccount = {
            id: 1,
            user: 'test-user',
            name: 'test-name',
            avatar: {
                id: 1,
                url: 'test-avatar',
            },
            balance: 100,
            allowance: 50,
            nextPayday: new Date(),
            firstPayday: new Date(),
        };

        mockAccountService = {
            currentAccount$: new BehaviorSubject<Account | null>(mockAccount),
            loading: new BehaviorSubject<boolean>(false),
            getCurrentAccount: jest.fn().mockReturnValue(mockAccount),
            getAccounts: jest.fn().mockReturnValue(of([mockAccount])),
            getAccount: jest.fn().mockReturnValue(of(mockAccount)),
            refreshAccount: jest.fn(),
            setAccount: jest.fn(),
            getAvatarForAccount: jest.fn().mockReturnValue('test-avatar'),
            getCurrentBalance: jest.fn().mockReturnValue(100),
            getCurrentAccountId: jest.fn().mockReturnValue(1),
            logoutOrDeselectAccount: jest.fn(),
        };

        mockRouterService = {
            navigateToRoute: jest.fn().mockResolvedValue(true),
        };

        mockParamMap = {
            get: jest.fn().mockReturnValue(RouteId.History),
        };

        mockSnapshot = {
            data: { routeId: RouteId.History },
            url: [],
            params: {},
            queryParams: {},
            fragment: null,
            paramMap: mockParamMap,
            queryParamMap: mockParamMap,
            outlet: 'primary',
            component: null,
            routeConfig: null,
            root: null,
            parent: null,
            firstChild: null,
            children: [],
            pathFromRoot: [],
            title: null,
        } as unknown as ActivatedRouteSnapshot;

        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                TranslateModule.forRoot(),
                TransactionHistoryComponent,
                MockPageHeaderComponent,
            ],
            providers: [
                { provide: AccountService, useValue: mockAccountService },
                { provide: Router, useValue: mockRouter },
                { provide: RouterService, useValue: mockRouterService },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: mockSnapshot,
                        firstChild: null,
                    },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(TransactionHistoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
