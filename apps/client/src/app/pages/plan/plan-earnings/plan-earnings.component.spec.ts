import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanEarningsComponent } from '../../../../../../../assets/client/config/plan-earnings.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('PlanEarningsComponent', () => {
    let component: PlanEarningsComponent;
    let fixture: ComponentFixture<PlanEarningsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, TranslateModule.forRoot(), FormsModule],
            declarations: [PlanEarningsComponent],
        });
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
});
