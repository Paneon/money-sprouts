import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { FormattingHelperService } from '@/app/services/formatting-helper.service';

import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'money-sprouts-plan-expenses',
    templateUrl: './plan-expenses.component.html',
    styleUrls: ['./plan-expenses.component.scss'],
    imports: [FormsModule, TranslatePipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanExpensesComponent {
    message: string | null = '';
    icon: string | null = null;

    @Output() readonly calculateAmount = new EventEmitter<number>();
    @Output() readonly applyChanges = new EventEmitter<{
        title: string;
        amount: number;
    }>();
    @Output() readonly resetBalance = new EventEmitter<void>();

    constructor(public formattingHelperService: FormattingHelperService) {}

    calculate(spendingForm: NgForm) {
        if (this.fieldsAreEmpty(spendingForm)) {
            return;
        } else if (spendingForm.valid) {
            const displayAmount = spendingForm.value.amount;
            const enteredAmount = this.formattingHelperService.germanFormatToNumber(displayAmount) * 100;
            console.log('enteredAmount: ', enteredAmount);
            this.calculateAmount.emit(enteredAmount);
            this.icon = 'ℹ';
            this.message = 'PLAN.TAB_SPENT.MESSAGE_CONFIRM';
        } else {
            this.icon = '⚠';
            this.message =
                'PLAN.TAB_SPENT.ERROR_MESSAGE.INPUTS_INVALID.PART_1 ' +
                spendingForm.value.amount +
                ' PLAN.TAB_SPENT.ERROR_MESSAGE.INPUTS_INVALID.PART_2 ' +
                spendingForm.value.title +
                ' PLAN.TAB_SPENT.ERROR_MESSAGE.INPUTS_INVALID.PART_3';
        }
    }

    apply(spendingForm: NgForm) {
        if (this.fieldsAreEmpty(spendingForm)) {
            return;
        } else if (spendingForm.valid) {
            const title = spendingForm.value.title;
            const enteredAmount = spendingForm.value.amount;
            const formattedAmount = this.formattingHelperService.germanFormatToNumber(enteredAmount);
            const amount = formattedAmount * -100;
            console.log('selected name & sum:', title, amount);

            this.applyChanges.emit({ title, amount });
            this.icon = '✔';
            this.message = 'PLAN.TAB_SPENT.MESSAGE_SUCCESS';
        } else {
            this.icon = '⚠';
            this.message = 'PLAN.TAB_SPENT.ERROR_MESSAGE.GENERAL';
        }
    }

    clearInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        input.value = '';
        this.message = '';
        console.log('clearInput triggered');
        this.resetBalance.emit();
    }

    private fieldsAreEmpty(form: NgForm): boolean {
        if (!form.value.title || !form.value.amount) {
            this.icon = '⚠';
            this.message = 'PLAN.TAB_SPENT.ERROR_MESSAGE.INPUTS_INCOMPLETE';
            return true;
        }
        return false;
    }

    onSubmit() {
        console.log('Form submitted!');
    }
}
