import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject } from 'rxjs';
import { Account } from '@money-sprouts/shared/domain';
import { AccountService } from '../../services/account.service';
import { RouterService } from '../../services/router.service';
import { RoutePath } from '../../enum/routepath';

interface Section {
    name: string;
    image: string;
}

@Component({
    selector: 'money-sprouts-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
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
        private readonly accountService: AccountService
    ) {}

    ngOnInit() {
        this.sections;
        setTimeout(() => {
            const urlSegments = this.router.getURL().split('/');
            this.name = urlSegments[2];
        });

        this.account$ = this.accountService.currentAccount$.pipe(
            debounceTime(300), // waits 300ms between emisssions
            distinctUntilChanged((prev, curr) => {
                return prev && curr ? prev.id === curr.id : prev === curr;
            })
        );

        this.account$.subscribe((account) => {
            this.accountService.refreshAccount(account.id);
        });

        this.accountService.currentAccount$.subscribe((account: Account) => {
            this.name = account.name;
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
