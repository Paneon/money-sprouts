import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Account } from '@money-sprouts/shared/domain';
import { AccountService } from '../../services/account.service';
import { routeToDashboard } from '../../app.routing.module';

@Component({
    selector: 'money-sprouts-account-selection',
    templateUrl: './account-selection.component.html',
    styleUrls: ['./account-selection.component.scss'],
})
export class AccountSelectionComponent implements OnInit {
    accounts$: Observable<Account[]>;

    constructor(
        private router: Router,
        public readonly route: ActivatedRoute,
        private accountService: AccountService
    ) {}

    ngOnInit(): void {
        this.accounts$ = of(this.route.snapshot.data['accounts']);
    }

    proceed(name: string) {
        if (!name) {
            return;
        }

        const accounts: Account[] = this.route.snapshot.data['accounts'];
        const selectedAccount = accounts.find(
            (account) => account.name === name
        );

        if (selectedAccount) {
            this.accountService.setAccount(selectedAccount);
            setTimeout(() => {
                this.router.navigate([routeToDashboard(name)]);
            });
        }
    }
}
