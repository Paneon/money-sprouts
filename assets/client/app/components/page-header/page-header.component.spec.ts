import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageHeaderComponent } from './page-header.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateService, provideTranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { of, BehaviorSubject, Subject } from 'rxjs';
import { RouteId } from '../../enum/route-id';
import { AccountService } from '../../services/account.service';
import { RouterService } from '../../services/router.service';
import { Account } from '../../types/account';
import { setupMockLocalStorage } from '../../testing/mocks/account-storage.mock';
import { MockMultiLanguageComponent } from '../../testing/mocks/components/mock-multi-language.component';

describe('PageHeaderComponent', () => {
    let component: PageHeaderComponent;
    let fixture: ComponentFixture<PageHeaderComponent>;
    let mockAccountService: Partial<AccountService>;
    let mockRouter: Partial<Router>;
    let mockRouterService: Partial<RouterService>;
    let mockAccount: Account;
    let routerEvents: Subject<NavigationEnd>;

    beforeEach(async () => {
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
            currentAccount$: of(mockAccount),
            logoutOrDeselectAccount: jest.fn().mockResolvedValue(undefined),
            loading: new BehaviorSubject<boolean>(false),
            getAvatarForAccount: jest.fn().mockReturnValue(mockAccount.avatar),
        };

        routerEvents = new Subject<NavigationEnd>();
        mockRouter = {
            url: '/test',
            events: routerEvents.asObservable(),
            navigate: jest.fn().mockResolvedValue(true),
        };

        mockRouterService = {
            navigateToRoute: jest.fn().mockResolvedValue(undefined),
            navigateToAccountDashboard: jest.fn().mockResolvedValue(undefined),
        };

        await TestBed.configureTestingModule({
            imports: [PageHeaderComponent, MockMultiLanguageComponent],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                provideTranslateService({
                    defaultLanguage: 'de',
                }),
                TranslateService,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            data: {
                                routeId: RouteId.Balance,
                            },
                        },
                        firstChild: null,
                    },
                },
                Router,
                AccountService,
                RouterService,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(PageHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set child class when provided', () => {
        const testClass = 'test-class';
        component.childClass = testClass;
        expect(component.childClass).toBe(testClass);
    });
});
