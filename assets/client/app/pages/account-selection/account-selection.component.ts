import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Account } from '@/app/types/account';
import { AccountService } from '@/app/services/account.service';
import { RouterService } from '@/app/services/router.service';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '@/app/components/page-header/page-header.component';
import { IconWithTextComponent } from '@/app/components/icon-with-text/icon-with-text.component';
import { FormatUrlPipe } from '@/app/pipes/format-url.pipe';

@Component({
    selector: 'money-sprouts-account-selection',
    templateUrl: './account-selection.component.html',
    styleUrls: ['./account-selection.component.scss'],
    imports: [CommonModule, RouterModule, PageHeaderComponent, IconWithTextComponent, FormatUrlPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSelectionComponent {
    accounts$: Observable<Account[]>;

    constructor(
        private readonly router: RouterService,
        public readonly route: ActivatedRoute,
        private readonly accountService: AccountService,
    ) {
        this.accounts$ = this.accountService.getAccounts();
    }

    proceed(name: string) {
        if (!name) {
            return;
        }

        this.accounts$.subscribe((accounts) => {
            const selectedAccount = accounts.find((account) => account.name === name);

            if (selectedAccount) {
                this.accountService.setAccount(selectedAccount);
                setTimeout(() => {
                    this.router.navigateToAccountDashboard(name);
                });
            }
        });
    }
}
