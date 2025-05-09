import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountSelectionComponent } from './account-selection.component';
import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateService, provideTranslateService } from '@ngx-translate/core';
import { AccountService } from '../../services/account.service';
import { RouterService } from '../../services/router.service';
import { Account } from '../../types/account';
import { ActivatedRoute } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, BehaviorSubject } from 'rxjs';
import { mockRouter } from '../../testing/mocks/router.mock';
import { Router } from '@angular/router';

describe('AccountSelectionComponent', () => {
    let component: AccountSelectionComponent;
    let fixture: ComponentFixture<AccountSelectionComponent>;
    let mockAccountService: Partial<AccountService>;
    let mockRouterService: Partial<RouterService>;
    let mockAccounts: Account[];

    beforeEach(async () => {
        mockAccounts = [
            {
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
            },
        ];

        mockAccountService = {
            currentAccount$: new BehaviorSubject<Account | null>(null),
            loading: new BehaviorSubject<boolean>(false),
            getAccounts: jest.fn().mockReturnValue(of(mockAccounts)),
            setAccount: jest.fn(),
            getAvatarForAccount: jest.fn().mockReturnValue(of('avatar-url')),
            logoutOrDeselectAccount: jest.fn(),
        };

        mockRouterService = {
            navigateToAccountDashboard: jest.fn(),
        };

        await TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, AccountSelectionComponent],
            providers: [
                provideHttpClientTesting(),
                provideTranslateService({
                    defaultLanguage: 'de',
                }),
                TranslateService,
                { provide: AccountService, useValue: mockAccountService },
                { provide: RouterService, useValue: mockRouterService },
                {
                    provide: ActivatedRoute,
                    useValue: { snapshot: { data: {} } },
                },
                { provide: Router, useValue: mockRouter },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AccountSelectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize accounts on init', () => {
        expect(mockAccountService.getAccounts).toHaveBeenCalled();
    });

    it('should not proceed when name is not provided', () => {
        component.proceed('');
        expect(mockRouterService.navigateToAccountDashboard).not.toHaveBeenCalled();
    });
});
