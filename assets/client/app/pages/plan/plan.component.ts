import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Account } from '@/app/types/account';
import { AccountService } from '@/app/services/account.service';
import { TransactionService } from '@/app/services/transaction.service';
import { CommonModule } from '@angular/common';
import { PlanExpensesComponent } from './plan-expenses/plan-expenses.component';
import { PlanEarningsComponent } from './plan-earnings/plan-earnings.component';

@Component({
    selector: 'money-sprouts-plan',
    templateUrl: './plan.component.html',
    styleUrls: ['./plan.component.scss'],
    standalone: true,
    imports: [CommonModule, PlanExpensesComponent, PlanEarningsComponent],
})
export class PlanComponent implements OnInit {
    account$: Observable<Account | null>;
    activeTab: 'spend' | 'earn' = 'spend';
    originalBalance: number | null = null;
    temporaryBalance: number | null = null;

    constructor(
        private readonly accountService: AccountService,
        private readonly transactionService: TransactionService
    ) {}

    ngOnInit() {
        this.account$ = this.accountService.currentAccount$;
        this.originalBalance = this.accountService.getCurrentBalance();
    }

    get balance() {
        return this.temporaryBalance ?? this.originalBalance;
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
