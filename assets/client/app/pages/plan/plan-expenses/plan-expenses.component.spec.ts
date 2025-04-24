import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanExpensesComponent } from './plan-expenses.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

describe('PlanExpensesComponent', () => {
    let component: PlanExpensesComponent;
    let fixture: ComponentFixture<PlanExpensesComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, TranslateModule.forRoot(), FormsModule],
            declarations: [PlanExpensesComponent],
        });
        fixture = TestBed.createComponent(PlanExpensesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('calculate', () => {
        const testCases = [
            {
                description: 'Valid form data',
                form: {
                    valid: true,
                    value: { amount: '1000', title: 'Test' },
                },
                expectedEmit: true,
                expectedAmount: 100000,
                expectedIcon: 'ℹ',
                expectedMessage: 'PLAN.TAB_SPENT.MESSAGE_CONFIRM',
            },
            {
                description: 'Invalid form data',
                form: {
                    valid: false,
                    value: { amount: '100', title: 'Test?' },
                },
                expectedEmit: false,
                expectedIcon: '⚠',
                expectedMessage:
                    'PLAN.TAB_SPENT.ERROR_MESSAGE.INPUTS_INVALID.PART_1 100 PLAN.TAB_SPENT.ERROR_MESSAGE.INPUTS_INVALID.PART_2 Test? PLAN.TAB_SPENT.ERROR_MESSAGE.INPUTS_INVALID.PART_3',
            },
        ];

        testCases.forEach((testCase) => {
            it(`should handle ${testCase.description}`, () => {
                const calculateAmountSpy = jest.spyOn(
                    component.calculateAmount,
                    'emit'
                );

                // Spy on the actual service method
                jest.spyOn(
                    component.formattingHelperService,
                    'germanFormatToNumber'
                ).mockReturnValue(testCase.expectedAmount / 100);

                component.calculate(testCase.form as any);

                if (testCase.expectedEmit) {
                    expect(calculateAmountSpy).toHaveBeenCalledWith(
                        testCase.expectedAmount
                    );
                    expect(
                        component.formattingHelperService.germanFormatToNumber
                    ).toHaveBeenCalledWith(testCase.form.value.amount);
                } else {
                    expect(calculateAmountSpy).not.toHaveBeenCalled();
                }
                expect(component.icon).toBe(testCase.expectedIcon);
                expect(component.message).toBe(testCase.expectedMessage);
            });
        });
    });

    describe('apply', () => {
        const testCases = [
            {
                description: 'Valid form data',
                form: {
                    valid: true,
                    value: { amount: '1000', title: 'Test Expense' },
                },
                expectedEmit: true,
                expectedTitle: 'Test Expense',
                expectedAmount: -100000,
                expectedIcon: '✔',
                expectedMessage: 'PLAN.TAB_SPENT.MESSAGE_SUCCESS',
            },
            {
                description: 'Invalid form data',
                form: {
                    valid: false,
                    value: { amount: 100, title: 'Test Expense' },
                },
                expectedEmit: false,
                expectedIcon: '⚠',
                expectedMessage: 'PLAN.TAB_SPENT.ERROR_MESSAGE.GENERAL',
            },
            {
                description: 'Empty fields in form',
                form: { valid: false, value: { amount: '', title: '' } },
                expectedEmit: false,
                expectedIcon: '⚠',
                expectedMessage:
                    'PLAN.TAB_SPENT.ERROR_MESSAGE.INPUTS_INCOMPLETE',
            },
        ];

        testCases.forEach((testCase) => {
            it(`should handle ${testCase.description}`, () => {
                const applyChangesSpy = jest.spyOn(
                    component.applyChanges,
                    'emit'
                );

                component.apply(testCase.form as any);

                if (testCase.expectedEmit) {
                    expect(applyChangesSpy).toHaveBeenCalledWith({
                        title: testCase.expectedTitle,
                        amount: testCase.expectedAmount,
                    });
                } else {
                    expect(applyChangesSpy).not.toHaveBeenCalled();
                }
                expect(component.icon).toBe(testCase.expectedIcon);
                expect(component.message).toBe(testCase.expectedMessage);
            });
        });
    });
});
