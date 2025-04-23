import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountService } from '@/app/services/account.service';
import { TransactionService } from '@/app/services/transaction.service';
import { of } from 'rxjs';

import { PlanEarningsComponent } from './plan-earnings.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

describe('PlanEarningsComponent', () => {
    let component: PlanEarningsComponent;
    let fixture: ComponentFixture<PlanEarningsComponent>;
    let mockAccountService: any;
    let mockTransactionService: any;

    beforeEach(async () => {
        mockAccountService = {
            currentAccount$: of({
                id: 1,
                name: 'Test Account',
                balance: 100,
                avatar: 'test.png',
            }),
            getCurrentAccountId: jest.fn().mockReturnValue(1),
        };

        mockTransactionService = {
            addTransaction: jest.fn(),
        };

        await TestBed.configureTestingModule({
            imports: [
                TranslateModule.forRoot(),
                FormsModule,
                RouterTestingModule,
            ],
            declarations: [PlanEarningsComponent],
            providers: [
                { provide: AccountService, useValue: mockAccountService },
                {
                    provide: TransactionService,
                    useValue: mockTransactionService,
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(PlanEarningsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('onChoreSelect', () => {
        const testCases = [
            {
                description: 'Selecting a chore',
                setup: () => (component.chores[0].selected = true),
                expectedSelectedChoreId: '1',
                expectedCalculated: false,
            },
            {
                description: 'Selecting a different chore',
                setup: () => {
                    component.chores[0].selected = false;
                    component.chores[1].selected = true;
                },
                expectedSelectedChoreId: '2',
                expectedCalculated: false,
            },
            {
                description: 'Deselecting a chore',
                setup: () => {
                    component.chores[0].selected = false;
                },
                expectedSelectedChoreId: null,
                expectedCalculated: false,
            },
        ];

        testCases.forEach((testCase) => {
            it(`should handle when ${testCase.description}`, () => {
                testCase.setup();
                const selectedChore = component.chores.find(
                    (chore) => chore.selected
                );

                if (selectedChore) {
                    component.onChoreSelect(selectedChore);
                } else {
                    component.onChoreSelect(component.chores[0]);
                }

                if (testCase.expectedSelectedChoreId) {
                    expect(component.selectedChore).not.toBeNull();
                    expect(component.selectedChore.id).toBe(
                        testCase.expectedSelectedChoreId
                    );
                    expect(component.selectedChore.calculated).toBe(
                        testCase.expectedCalculated
                    );
                } else {
                    expect(component.selectedChore).toBeNull();
                }
            });
        });
    });

    describe('clearAction', () => {
        it('should clear messages and reset balance', () => {
            const resetBalanceSpy = jest.spyOn(component.resetBalance, 'emit');
            component['clearAction']();
            expect(component.message).toBe('');
            expect(component.errorMessage).toBe('');
            expect(component.icon).toBeNull();
            expect(resetBalanceSpy).toHaveBeenCalled();
        });
    });

    describe('clearMessages', () => {
        it('should clear messages and icon', () => {
            component['clearMessages']();
            expect(component.message).toBe('');
            expect(component.errorMessage).toBe('');
            expect(component.icon).toBeNull();
        });
    });

    describe('calculate', () => {
        const testCases = [
            {
                description: 'Selected and not calculated chore',
                selectedChoreIndex: 0,
                makeCalculated: false,
                expectedIcon: 'ℹ',
                expectedMessage: 'PLAN.TAB_EARN.MESSAGE_CONFIRM',
                expectedEmit: true,
            },
            {
                description: 'Selected and already calculated chore',
                selectedChoreIndex: 0,
                makeCalculated: true,
                expectedIcon: '⚠',
                expectedMessage: '',
                expectedErrorMessage: 'PLAN.TAB_EARN.MESSAGE_DENY',
                expectedEmit: false,
            },
            {
                description: 'No selected chore',
                selectedChoreIndex: null,
                expectedIcon: '⚠',
                expectedErrorMessage:
                    'PLAN.TAB_EARN.ERROR_MESSAGE.NO_SELECTION',
                expectedEmit: false,
            },
        ];

        testCases.forEach((testCase) => {
            it(`should handle ${testCase.description}`, () => {
                const calculateAmountSpy = jest.spyOn(
                    component.calculateAmount,
                    'emit'
                );
                component.selectedChore =
                    testCase.selectedChoreIndex !== null
                        ? component.chores[testCase.selectedChoreIndex]
                        : null;

                if (
                    testCase.selectedChoreIndex !== null &&
                    testCase.makeCalculated
                ) {
                    component.selectedChore.calculated = true;
                }

                component.calculate();

                expect(component.icon).toBe(testCase.expectedIcon);
                expect(component.message).toBe(testCase.expectedMessage || '');
                expect(component.errorMessage).toBe(
                    testCase.expectedErrorMessage || ''
                );

                if (testCase.expectedEmit) {
                    expect(calculateAmountSpy).toHaveBeenCalledWith(
                        component.selectedChore.sum * 100
                    );
                } else {
                    expect(calculateAmountSpy).not.toHaveBeenCalled();
                }
            });
        });
    });

    describe('apply', () => {
        const testCases = [
            {
                description: 'With selected chore',
                selectedChoreIndex: 0,
                expectedIcon: '✔',
                expectedMessage: 'PLAN.TAB_EARN.MESSAGE_SUCCESS',
                expectedEmit: true,
            },
            {
                description: 'No selected chore',
                selectedChoreIndex: null,
                expectedIcon: '⚠',
                expectedErrorMessage:
                    'PLAN.TAB_EARN.ERROR_MESSAGE.NO_SELECTION',
                expectedEmit: false,
            },
        ];

        testCases.forEach((testCase) => {
            it(`should handle ${testCase.description}`, () => {
                const applyChangesSpy = jest.spyOn(
                    component.applyChanges,
                    'emit'
                );
                jest.spyOn(component['translate'], 'get').mockReturnValue(
                    of('Mocked Chore Name')
                );

                component.selectedChore =
                    testCase.selectedChoreIndex !== null
                        ? component.chores[testCase.selectedChoreIndex]
                        : null;

                const expectedAmount = component.selectedChore
                    ? component.selectedChore.sum * 100
                    : null;

                component.apply();

                expect(component.icon).toBe(testCase.expectedIcon);
                expect(component.message).toBe(testCase.expectedMessage || '');
                expect(component.errorMessage).toBe(
                    testCase.expectedErrorMessage || ''
                );

                if (testCase.expectedEmit) {
                    expect(applyChangesSpy).toHaveBeenCalledWith({
                        title: 'Mocked Chore Name',
                        amount: expectedAmount,
                    });
                } else {
                    expect(applyChangesSpy).not.toHaveBeenCalled();
                }
            });
        });
    });

    describe('selectChore', () => {
        it('should set the selected chore', () => {
            const testChore = {
                id: 1,
                name: 'Test Chore',
                sum: 10,
                calculated: false,
            };

            component.selectChore(testChore);
            expect(component.selectedChore?.id).toBe(testChore.id);
            expect(component.selectedChore?.name).toBe(testChore.name);
            expect(component.selectedChore?.sum).toBe(testChore.sum);
            expect(component.selectedChore?.calculated).toBe(
                testChore.calculated
            );
        });
    });

    describe('addTransaction', () => {
        it('should add a transaction when a chore is selected', () => {
            const testChore = {
                id: 1,
                name: 'Test Chore',
                sum: 10,
                calculated: false,
            };

            component.selectChore(testChore);

            if (component.selectedChore) {
                component.selectedChore.calculated = true;
                component.addTransaction();

                expect(
                    mockTransactionService.addTransaction
                ).toHaveBeenCalledWith(
                    1,
                    component.selectedChore.sum * 100,
                    'Chore completed: Test Chore'
                );
            }
        });
    });
});
