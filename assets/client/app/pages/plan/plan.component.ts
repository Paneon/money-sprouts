import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Account } from '@/app/types/account';
import { AccountService } from '@/app/services/account.service';
import { TransactionService } from '@/app/services/transaction.service';

@Component({
    selector: 'money-sprouts-plan',
    templateUrl: './plan.component.html',
    styleUrls: ['./plan.component.scss'],
})
export class PlanComponent implements OnInit {
    account$: Observable<Account>;
    name: string = '';
    activeTab: 'spend' | 'earn' = 'spend';
    currentBalance: number = 0;
    originalBalance: number | null = null;
    temporaryBalance: number | null = null;

    constructor(
        private readonly accountService: AccountService,
        private readonly transactionService: TransactionService
    ) {
        this.account$ = this.accountService.currentAccount$.pipe(
            filter((account): account is Account => account !== null),
            map((account) => ({
                ...account,
                balance: account.balance || 0,
            }))
        );
    }

    ngOnInit() {
        this.account$.subscribe((account) => {
            this.name = account.name || '';
            this.currentBalance = account.balance || 0;
            if (this.originalBalance === null) {
                this.originalBalance = this.currentBalance;
            }
        });
    }

    get balance() {
        return (
            this.temporaryBalance ?? this.originalBalance ?? this.currentBalance
        );
    }

    switchTab(tab: 'spend' | 'earn'): void {
        this.activeTab = tab;
        this.onResetBalance();
    }

    onCalculateDeductionOfAmount(amount: number) {
        if (this.originalBalance !== null) {
            this.temporaryBalance = this.originalBalance - amount;
        }
    }

    onCalculateAdditionOfAmount(amount: number) {
        if (this.originalBalance !== null) {
            this.temporaryBalance = this.originalBalance + amount;
        }
    }

    onResetBalance(): void {
        this.temporaryBalance = null;
    }

    onApplyChanges(title: string, value: number) {
        const accountId = this.accountService.getCurrentAccountId();
        if (accountId !== null) {
            this.transactionService.addTransaction(title, value, accountId);
        }
    }
}
