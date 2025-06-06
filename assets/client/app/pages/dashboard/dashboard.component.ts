import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { debounceTime, Observable, Subject } from 'rxjs';
import { Account } from '@/app/types/account';
import { AccountService } from '@/app/services/account.service';
import { RouterService } from '@/app/services/router.service';
import { distinctUntilChanged, filter } from 'rxjs/operators';

import { TranslatePipe } from '@ngx-translate/core';
import { PageHeaderComponent } from '@/app/components/page-header/page-header.component';

interface Section {
    name: string;
    image: string;
}

@Component({
    selector: 'money-sprouts-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    imports: [TranslatePipe, PageHeaderComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
    name: string;
    account$: Observable<Account>;

    urlSegments: string;

    sections: Section[] = [
        {
            name: 'DASHBOARD.SECTION_NAME.OVERVIEW',
            image: './assets/images/overview.png',
        },
        {
            name: 'DASHBOARD.SECTION_NAME.HISTORY',
            image: './assets/images/history.png',
        },
        {
            name: 'DASHBOARD.SECTION_NAME.PLAN',
            image: './assets/images/plan.png',
        },
    ];

    private destroy$ = new Subject<void>();

    constructor(
        private readonly router: RouterService,
        private readonly accountService: AccountService,
    ) {}

    ngOnInit() {
        this.sections;
        setTimeout(() => {
            const urlSegments = this.router.getURL().split('/');
            this.name = urlSegments[2];
        });

        this.account$ = this.accountService.currentAccount$.pipe(
            filter((account): account is Account => account !== null),
            debounceTime(300),
            distinctUntilChanged((prev, curr) => {
                return prev.id === curr.id;
            }),
        );

        this.account$.subscribe((account) => {
            this.accountService.refreshAccount(account.id);
        });

        this.accountService.currentAccount$.subscribe((account: Account | null) => {
            this.name = account?.name || '';
        });
    }

    goToSection(section: string) {
        if (!this.name) {
            throw new Error('No account name available!');
        }

        switch (section) {
            case 'DASHBOARD.SECTION_NAME.OVERVIEW':
                this.router.navigateToOverview(this.name);
                break;
            case 'DASHBOARD.SECTION_NAME.HISTORY':
                this.router.navigateToHistory(this.name);
                break;
            case 'DASHBOARD.SECTION_NAME.PLAN':
                this.router.navigateToPlan(this.name);
                break;
        }
    }
}
