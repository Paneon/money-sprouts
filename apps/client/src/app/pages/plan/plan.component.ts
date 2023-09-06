import { Component, OnInit } from '@angular/core';
import { Account } from '@money-sprouts/shared/domain';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AccountService } from '../../services/account.service';

@Component({
    selector: 'money-sprouts-plan',
    templateUrl: './plan.component.html',
    styleUrls: ['./plan.component.scss'],
})
export class PlanComponent implements OnInit {
    account$: Observable<Account | null>;
    activeTab: 'spend' | 'earn' = 'spend';
    originalBalance: number | null = null;

    constructor(
        private accountService: AccountService,
        private http: HttpClient
    ) {}

    ngOnInit() {
        this.account$ = this.accountService.currentAccount$;
        this.originalBalance = this.accountService.getCurrentBalance();
    }

    switchTab(tab: 'spend' | 'earn'): void {
        this.activeTab = tab;
    }

    onCalculateAmount(amount: number) {
        this.accountService.updateBalanceTemporarily(amount);
    }

    onResetBalance(): void {
        console.log('onResetBalance triggered');
        this.accountService.resetBalanceToOriginal();
    }

    onApplyChanges() {
        this.accountService.applyBalanceChange();
    }
}
