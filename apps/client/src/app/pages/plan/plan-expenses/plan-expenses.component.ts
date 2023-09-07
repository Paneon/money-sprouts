import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormattingHelperService } from '../../../services/formatting-helper.service';

@Component({
    selector: 'money-sprouts-plan-expenses',
    templateUrl: './plan-expenses.component.html',
    styleUrls: ['./plan-expenses.component.scss'],
})
export class PlanExpensesComponent {
    message: string | null = '';
    icon: string | null = null;

    @Output() calculateAmount = new EventEmitter<number>();
    @Output() applyChanges = new EventEmitter<{
        title: string;
        amount: number;
    }>();
    @Output() resetBalance = new EventEmitter<void>();

    constructor(public formattingHelperService: FormattingHelperService) {}

    calculate(spendingForm: NgForm) {
        if (this.fieldsAreEmpty(spendingForm)) {
            return;
        } else if (spendingForm.valid) {
            const displayAmount = spendingForm.value.amount;
            const enteredAmount =
                this.formattingHelperService.germanFormatToNumber(
                    displayAmount
                ) * 100;
            console.log('enteredAmount: ', enteredAmount);
            this.calculateAmount.emit(enteredAmount);
            this.icon = 'ℹ';
            this.message =
                'Do you want to purchase this product? Then click "Apply".';
        } else {
            this.icon = '⚠';
            this.message = `The inputs "${spendingForm.value.amount}" or "${spendingForm.value.title}" seem to be invalid. Please try again.`;
        }
    }

    apply(spendingForm: NgForm) {
        if (this.fieldsAreEmpty(spendingForm)) {
            return;
        } else if (spendingForm.valid) {
            const title = spendingForm.value.title;
            const amount = spendingForm.value.amount * -100;
            this.applyChanges.emit({ title, amount });
            this.icon = '✔';
            this.message =
                'Success! Your sale will soon be approved by your parents and be applied to your total balance.';
        } else {
            this.icon = '⚠';
            this.message = 'Something went wrong. Please try again.';
        }
    }

    clearInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        input.value = '';
        console.log('clearInput triggered');
        this.resetBalance.emit();
    }

    fieldsAreEmpty(form: NgForm): boolean {
        if (!form.value.title || !form.value.amount) {
            this.icon = '⚠';
            this.message = 'Both fields are required.';
            return true;
        }
        return false;
    }

    onSubmit() {
        console.log('Form submitted!');
    }
}
