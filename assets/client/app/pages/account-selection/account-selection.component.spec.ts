import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountSelectionComponent } from './account-selection.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountService } from '@/app/services/account.service';
import { of } from 'rxjs';

describe('AccountSelectionComponent', () => {
    let component: AccountSelectionComponent;
    let fixture: ComponentFixture<AccountSelectionComponent>;
    let mockAccountService: any;

    const mockAccounts = [
        {
            id: 1,
            name: 'Test Account 1',
            balance: 100,
            avatar: 'test1.png',
        },
        {
            id: 2,
            name: 'Test Account 2',
            balance: 200,
            avatar: 'test2.png',
        },
    ];

    beforeEach(async () => {
        mockAccountService = {
            getAccounts: jest.fn().mockReturnValue(of(mockAccounts)),
            setCurrentAccount: jest.fn(),
        };

        await TestBed.configureTestingModule({
            declarations: [AccountSelectionComponent],
            imports: [RouterTestingModule],
            providers: [
                { provide: AccountService, useValue: mockAccountService },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AccountSelectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load accounts on init', () => {
        let accounts: any[] = [];
        component.accounts$.subscribe((data) => {
            accounts = data;
        });
        expect(accounts).toEqual(mockAccounts);
        expect(mockAccountService.getAccounts).toHaveBeenCalled();
    });

    it('should select account', () => {
        const testAccount = mockAccounts[0];
        component.selectAccount(testAccount);
        expect(mockAccountService.setCurrentAccount).toHaveBeenCalledWith(
            testAccount
        );
    });
});
