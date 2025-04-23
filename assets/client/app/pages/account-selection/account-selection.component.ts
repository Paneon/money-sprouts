import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Account } from '@/app/types/account';
import { AccountService } from '@/app/services/account.service';
import { RouterService } from '@/app/services/router.service';
import { RoutePath } from '@/app/enum/routepath';

@Component({
    selector: 'money-sprouts-account-selection',
    templateUrl: './account-selection.component.html',
    styleUrls: ['./account-selection.component.scss'],
})
export class AccountSelectionComponent implements OnInit {
    accounts$: Observable<Account[]> = of([]);

    constructor(
        private readonly router: RouterService,
        public readonly route: ActivatedRoute,
        private readonly accountService: AccountService
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
                this.router.navigateToRouteForAccountName(
                    RoutePath.Dashboard,
                    name
                );
            });
        }
    }
}
