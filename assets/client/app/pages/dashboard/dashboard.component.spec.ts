import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { provideHttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of, BehaviorSubject } from 'rxjs';
import { RouterService } from '../../services/router.service';
import { AccountService } from '../../services/account.service';
import { Account } from '../../types/account';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, ParamMap, Routes } from '@angular/router';
import { RouteId } from '../../enum/route-id';
import { setupMockLocalStorage } from '../../testing/mocks/account-storage.mock';
import { provideRouter } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';
import { withComponentInputBinding } from '@angular/router';
import { MockPageHeaderComponent } from '../../testing/mocks/components/mock-page-header.component';

const routes: Routes = [
    {
        path: 'account/:name/dashboard',
        component: DashboardComponent,
    },
];

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let mockAccountService: jest.Mocked<Partial<AccountService>>;
    let mockRouterService: jest.Mocked<Partial<RouterService>>;
    let mockAccount: Account;
    let mockRouter: Partial<Router>;
    let mockActivatedRoute: Partial<ActivatedRoute>;

    beforeEach(() => {
        mockAccount = {
            id: 1,
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
        };

        setupMockLocalStorage(mockAccount);

        mockAccountService = {
            currentAccount$: new BehaviorSubject<Account | null>(mockAccount),
            loading: new BehaviorSubject<boolean>(false),
            getAccounts: jest.fn().mockReturnValue(of([mockAccount])),
            getAccount: jest.fn().mockReturnValue(of(mockAccount)),
            refreshAccount: jest.fn().mockReturnValue(of(mockAccount).subscribe()),
            setAccount: jest.fn(),
            getAvatarForAccount: jest.fn().mockReturnValue(mockAccount.avatar?.url ?? ''),
            getCurrentBalance: jest.fn().mockReturnValue(mockAccount.balance),
            getCurrentAccountId: jest.fn().mockReturnValue(mockAccount.id),
            logoutOrDeselectAccount: jest.fn(),
            balanceUpdateStatus$: new BehaviorSubject<string>(''),
        };

        mockRouterService = {
            getURL: jest.fn().mockReturnValue('/account/jasmine/dashboard'),
            navigateToOverview: jest.fn(),
            navigateToHistory: jest.fn(),
            navigateToPlan: jest.fn(),
        };

        mockRouter = {
            url: '/account/jasmine/dashboard',
            events: of(),
        };

        const mockParamMap: ParamMap = {
            has: jest.fn().mockReturnValue(false),
            get: jest.fn().mockReturnValue(null),
            getAll: jest.fn().mockReturnValue([]),
            keys: [],
        };

        const mockSnapshot = {
            data: { routeId: RouteId.AccountDashboard },
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

        mockActivatedRoute = {
            snapshot: mockSnapshot,
            firstChild: null,
        };

        TestBed.configureTestingModule({
            imports: [DashboardComponent, TranslateModule.forRoot(), MockPageHeaderComponent, NoopAnimationsModule],
            providers: [
                provideHttpClient(),
                provideRouter(routes, withComponentInputBinding()),
                provideLocationMocks(),
                { provide: AccountService, useValue: mockAccountService },
                { provide: RouterService, useValue: mockRouterService },
                { provide: Router, useValue: mockRouter },
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                TranslateService,
            ],
        });

        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have sections initialized', () => {
        expect(component.sections.length).toBe(3);
        expect(component.sections[0].name).toBe('DASHBOARD.SECTION_NAME.OVERVIEW');
        expect(component.sections[1].name).toBe('DASHBOARD.SECTION_NAME.HISTORY');
        expect(component.sections[2].name).toBe('DASHBOARD.SECTION_NAME.PLAN');
    });

    it('should subscribe and handle account data', () => {
        component.account$.subscribe((account) => {
            expect(account).toBeDefined();
            expect(mockAccountService.refreshAccount).toHaveBeenCalledWith(mockAccount.id);
        });
    });

    it('should set name from URL on init', (done) => {
        // Use fakeAsync and tick to handle setTimeout
        jest.useFakeTimers();
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        jest.runAllTimers();

        expect(component.name).toBe('jasmine');
        expect(mockRouterService.getURL).toHaveBeenCalled();
        done();
    });

    it('should navigate to the correct section for Overview', () => {
        component.name = 'testAccount';
        component.goToSection('DASHBOARD.SECTION_NAME.OVERVIEW');
        expect(mockRouterService.navigateToOverview).toHaveBeenCalledWith('testAccount');
    });

    it('should navigate to the correct section for History', () => {
        component.name = 'testAccount';
        component.goToSection('DASHBOARD.SECTION_NAME.HISTORY');
        expect(mockRouterService.navigateToHistory).toHaveBeenCalledWith('testAccount');
    });

    it('should navigate to the correct section for Plan', () => {
        component.name = 'testAccount';
        component.goToSection('DASHBOARD.SECTION_NAME.PLAN');
        expect(mockRouterService.navigateToPlan).toHaveBeenCalledWith('testAccount');
    });

    it('should not navigate when name is not available', () => {
        component.name = '';
        expect(() => {
            component.goToSection('DASHBOARD.SECTION_NAME.OVERVIEW');
        }).toThrow('No account name available!');
        expect(mockRouterService.navigateToOverview).not.toHaveBeenCalled();
    });
});
