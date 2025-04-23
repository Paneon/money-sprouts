import { Component, OnInit } from '@angular/core';
import { debounceTime, Observable, Subject } from 'rxjs';
import { Account } from '@/app/types/account';
import { AccountService } from '@/app/services/account.service';
import { RouterService } from '@/app/services/router.service';
import { RoutePath } from '@/app/enum/routepath';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeaderComponent } from '@/app/components/page-header/page-header.component';

interface Section {
    name: string;
    image: string;
}

@Component({
    selector: 'money-sprouts-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: true,
    imports: [CommonModule, TranslateModule, PageHeaderComponent],
})
export class DashboardComponent implements OnInit {
    name: string = '';
    account$: Observable<Account>;

    urlSegments: string = '';

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
        private readonly accountService: AccountService
    ) {
        this.account$ = this.accountService.currentAccount$.pipe(
            filter((account): account is Account => account !== null),
            debounceTime(300)
        );
    }

    ngOnInit() {
        this.sections;
        setTimeout(() => {
            const urlSegments = this.router.getURL().split('/');
            this.name = urlSegments[2];
        });

        this.account$.subscribe((account) => {
            this.name = account.name || '';
        });

        this.account$.subscribe((account) => {
            this.accountService.refreshAccount(account.id);
        });
    }

    goToSection(section: string) {
        if (!this.name) {
            console.error('No account name available!');
            return;
        }

        switch (section) {
            case 'DASHBOARD.SECTION_NAME.OVERVIEW':
                this.router.navigateToRouteForAccountName(
                    RoutePath.Overview,
                    this.name
                );
                break;
            case 'DASHBOARD.SECTION_NAME.HISTORY':
                this.router.navigateToRouteForAccountName(
                    RoutePath.History,
                    this.name
                );
                break;
            case 'DASHBOARD.SECTION_NAME.PLAN':
                this.router.navigateToRouteForAccountName(
                    RoutePath.Plan,
                    this.name
                );
                break;
        }
    }
}
