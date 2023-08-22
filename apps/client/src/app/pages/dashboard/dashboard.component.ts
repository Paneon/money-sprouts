import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
    debounceTime,
    distinctUntilChanged,
    filter,
    map,
    Observable,
    Subject,
    takeUntil,
} from 'rxjs';
import { Account } from '@money-sprouts/shared/domain';
import { AccountService } from '../../services/account.service';
import {
    routeToHistory,
    routeToOverview,
    routeToPlan,
} from '../../app.routing.module';

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
            name: 'Overview',
            image: './assets/images/overview.png',
        },
        {
            name: 'History',
            image: './assets/images/history.png',
        },
        {
            name: 'Plan',
            image: './assets/images/plan.png',
        },
    ];

    private destroy$ = new Subject<void>();

    constructor(
        private router: Router,
        private accountService: AccountService
    ) {}

    ngOnInit() {
        this.sections;
        const urlSegments = this.router.url.split('/');
        this.name = urlSegments[2];
        this.account$ = this.accountService.currentAccount$.pipe(
            debounceTime(300), // waits 300ms between emisssions
            distinctUntilChanged((prev, curr) => {
                return prev && curr ? prev.id === curr.id : prev === curr;
            })
        );

        this.account$.subscribe((account) => {
            this.accountService.refreshAccount(account.id);
        });

        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                map(() => this.router.url.split('/')[2]),
                distinctUntilChanged(),
                takeUntil(this.destroy$)
            )
            .subscribe((name) => {
                this.name = decodeURI(name);
                this.accountService.getAccountByName(name);
            });
    }

    goToSection(section: string) {
        if (!this.name) {
            console.error('No account name available!');
            return;
        }

        switch (section) {
            case 'Overview':
                this.router.navigate([routeToOverview(this.name)]);
                break;
            case 'History':
                this.router.navigate([routeToHistory(this.name)]);
                break;
            case 'Plan':
                this.router.navigate([routeToPlan(this.name)]);
                break;
        }
    }
}
