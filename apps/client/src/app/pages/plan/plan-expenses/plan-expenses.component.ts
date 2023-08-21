import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'money-sprouts-plan-expenses',
    templateUrl: './plan-expenses.component.html',
    styleUrls: ['./plan-expenses.component.scss'],
})
export class PlanExpensesComponent {
    message: string | null = '';
    icon: string | null = null;

    @Output() calculateAmount = new EventEmitter<number>();
    @Output() applyChanges = new EventEmitter<void>();
    @Output() resetBalance = new EventEmitter<void>();

    calculate(spendingForm: NgForm) {
        if (this.fieldsAreEmpty(spendingForm)) {
            return;
        } else if (spendingForm.valid) {
            const displayAmount = spendingForm.value.amount;
            const enteredAmount =
                this.germanFormatToNumber(displayAmount) * 100;
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
            this.applyChanges.emit();
            this.icon = '✔';
            this.message =
                'Success! Your sale will soon be approved by your parents and be applied to your total balance.';
        } else {
            this.icon = '⚠';
            this.message = 'Something went wrong. Please try again.';
        }
    }

    formatNameInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        let value = input.value;
        value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        input.value = value;
    }

    formatAmountInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        const value = parseFloat(input.value.replace(',', '.'));
        if (!isNaN(value)) {
            input.value = this.convertToGermanFormat(value);
        } else {
            this.icon = '⚠';
            this.message = 'Please enter a valid amount.';
        }
    }

    convertToGermanFormat(amount: number): string {
        let str = amount.toFixed(2);
        str = str.replace('.', ',');
        return str;
    }

    germanFormatToNumber(amount: string): number {
        const numberAmount = amount.replace(',', '.');
        return parseFloat(numberAmount);
    }

    fieldsAreEmpty(form: NgForm): boolean {
        if (!form.value.title || !form.value.amount) {
            this.icon = '⚠';
            this.message = 'Both fields are required.';
            return true;
        }
        return false;
    }

    clearInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        input.value = '';
        console.log('clearInput triggered');
        this.resetBalance.emit();
    }

    onSubmit() {
        console.log('Form submitted!');
    }
}
