import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { Account } from '@money-sprouts/shared/domain';
import { AccountService } from '../../services/account.service';

@Component({
    selector: 'money-sprouts-user-selection',
    templateUrl: './user-selection.component.html',
    styleUrls: ['./user-selection.component.scss'],
})
export class UserSelectionComponent implements OnInit {
    accounts$: Observable<Account[]>;

    constructor(
        private router: Router,
        public readonly route: ActivatedRoute,
        private accountService: AccountService
    ) {}

    ngOnInit(): void {
        this.accounts$ = of(this.route.snapshot.data['users']).pipe(
            map((accounts: Account[]) => accounts)
        );
    }

    proceed(name: string) {
        if (!name) {
            return;
        }

        const accounts: Account[] = this.route.snapshot.data['users'];
        const selectedAccount = accounts.find(
            (account) => account.name === name
        );

        if (selectedAccount) {
            this.accountService.setAccount(selectedAccount);
            setTimeout(() => {
                this.router.navigate([`user/${name}/dashboard`]);
            });
        }
    }
}
