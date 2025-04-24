import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class FormattingHelperService {
    message: string | null = '';
    icon: string | null = null;

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
}
