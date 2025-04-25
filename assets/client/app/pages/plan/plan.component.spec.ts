import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanComponent } from './plan.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AccountStorageService } from '../../services/account-storage.service';
import { TranslateModule } from '@ngx-translate/core';
import { AccountService } from '../../services/account.service';
import { TransactionService } from '../../services/transaction.service';
import { of } from 'rxjs';
import { MockPageHeaderComponent } from '../../testing/mocks/components/mock-page-header.component';
import { Account } from '../../types/account';

describe('PlanComponent', () => {
    let component: PlanComponent;
    let fixture: ComponentFixture<PlanComponent>;
    let mockAccountService: Partial<AccountService>;
    let mockTransactionService: Required<Pick<TransactionService, 'addTransaction'>>;
    let mockAccountStorageService: Required<Pick<AccountStorageService, 'getCurrentAccount'>>;

    beforeEach(async () => {
        mockAccountService = {
            currentAccount$: of({
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
            }),
            refreshAccount: jest.fn(),
            getCurrentBalance: jest.fn().mockReturnValue(120),
            getCurrentAccountId: jest.fn().mockReturnValue('1'),
        } as any;

        mockTransactionService = {
            addTransaction: jest.fn(),
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
                balance: 120,
                allowance: 2,
                firstPayday: new Date(),
            }),
        };

        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, TranslateModule.forRoot(), PlanComponent, MockPageHeaderComponent],
            providers: [
                { provide: AccountService, useValue: mockAccountService },
                {
                    provide: TransactionService,
                    useValue: mockTransactionService,
                },
                {
                    provide: AccountStorageService,
                    useValue: mockAccountStorageService,
                },
            ],
        })
            .overrideComponent(PlanComponent, {
                set: { template: '<div></div>' },
            })
            .compileComponents();

        fixture = TestBed.createComponent(PlanComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize with the correct initial states and services', () => {
        expect(component).toBeTruthy();
        component.account$.subscribe((account) => {
            expect(account).toBeTruthy();
            expect(account).toHaveProperty('balance', 120);
        });
        expect(component.originalBalance).toEqual(120);
        expect(component.temporaryBalance).toBeNull();
    });

    describe('switchTab', () => {
        it('should switch tabs and reset balance', () => {
            component.switchTab('earn');
            expect(component.activeTab).toEqual('earn');
            expect(component.temporaryBalance).toBeNull();

            component.switchTab('spend');
            expect(component.activeTab).toEqual('spend');
            expect(component.temporaryBalance).toBeNull();
        });
    });

    describe('onCalculateDeductionOfAmount, onCalculateAdditionOfAmount', () => {
        it('should correctly calculate temporary balance when spending', () => {
            component.originalBalance = 100;
            component.onCalculateDeductionOfAmount(30);
            expect(component.temporaryBalance).toEqual(70);
        });

        it('should correctly calculate temporary balance when earning', () => {
            component.originalBalance = 100;
            component.onCalculateAdditionOfAmount(50);
            expect(component.temporaryBalance).toEqual(150);
        });
    });

    describe('onResetBalance', () => {
        it('should reset the temporary balance', () => {
            component.temporaryBalance = 200;
            component.onResetBalance();
            expect(component.temporaryBalance).toBeNull();
        });
    });

    describe('onApplyChanges', () => {
        it('should apply changes using the TransactionService', () => {
            const transactionSpy = jest.spyOn(mockTransactionService, 'addTransaction');
            const title = 'Test Transaction';
            const value = 50;
            const mockAccount = mockAccountStorageService.getCurrentAccount() as NonNullable<Account>;

            component.onApplyChanges(title, value);
            expect(transactionSpy).toHaveBeenCalledWith(title, value, mockAccount.id);
        });
    });
});
