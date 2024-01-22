import { Component, OnInit } from '@angular/core';
import { Account } from '@money-sprouts/shared/domain';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AccountService } from '../../services/account.service';
import { TransactionService } from '../../services/transaction.service';

@Component({
    selector: 'money-sprouts-plan',
    templateUrl: './plan.component.html',
    styleUrls: ['./plan.component.scss'],
})
export class PlanComponent implements OnInit {
    account$: Observable<Account | null>;
    activeTab: 'spend' | 'earn' = 'spend';
    originalBalance: number | null = null;
    temporaryBalance: number | null = null;

    constructor(
        private readonly accountService: AccountService,
        private readonly transactionService: TransactionService,
        private readonly http: HttpClient
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
        this.temporaryBalance = this.originalBalance - amount;
    }

    onCalculateAdditionOfAmount(amount: number) {
        this.temporaryBalance = this.originalBalance + amount;
    }

    onResetBalance(): void {
        this.temporaryBalance = null;
    }

    onApplyChanges(title: string, value: number) {
        this.transactionService.addTransaction(
            title,
            value,
            this.accountService.getCurrentAccountId()
        );
    }
}
