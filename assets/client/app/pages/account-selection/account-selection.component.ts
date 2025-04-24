import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Account } from '@/app/types/account';
import { AccountService } from '@/app/services/account.service';
import { RouterService } from '@/app/services/router.service';
import { RoutePath } from '@/app/enum/routepath';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeaderComponent } from '@/app/components/page-header/page-header.component';
import { IconWithTextComponent } from '@/app/components/icon-with-text/icon-with-text.component';
import { FormatUrlPipe } from '@/app/pipes/format-url.pipe';

@Component({
    selector: 'money-sprouts-account-selection',
    templateUrl: './account-selection.component.html',
    styleUrls: ['./account-selection.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        PageHeaderComponent,
        IconWithTextComponent,
        FormatUrlPipe,
    ],
})
export class AccountSelectionComponent implements OnInit {
    accounts$: Observable<Account[]> = of([]);

    constructor(
        private readonly router: RouterService,
        public readonly route: ActivatedRoute,
        private readonly accountService: AccountService
    ) {}

    trackByAccount(index: number, account: Account): number {
        return account.id;
    }

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
