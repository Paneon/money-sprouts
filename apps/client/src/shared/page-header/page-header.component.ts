import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AccountService } from '../../app/services/account.service';
import {
    distinctUntilChanged,
    filter,
    map,
    Observable,
    Subject,
    takeUntil,
} from 'rxjs';
import { Account } from '@money-sprouts/shared/domain';
import { RoutePath, routeToDashboard } from '../../app/app.routing.module';

@Component({
    selector: 'money-sprouts-page-header',
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit, OnDestroy {
    childClass: string;
    name: string;
    account$: Observable<Account | null>;
    urlSegment: string;
    logout = 'Logout';
    avatar: string;
    id: number;
    isLoading = false;

    private destroy$ = new Subject<void>();

    constructor(private router: Router, public accountService: AccountService) {
        this.accountService.loading.subscribe((loading) => {
            this.isLoading = loading;
        });
    }

    ngOnInit() {
        const urlSegments = this.router.url.split('/');
        this.urlSegment = urlSegments[urlSegments.length - 1];
        this.name = urlSegments[2];

        this.account$ = this.accountService.currentAccount$.pipe(
            distinctUntilChanged()
        );

        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                map(() => this.router.url.split('/')[2]),
                distinctUntilChanged(),
                takeUntil(this.destroy$)
            )
            .subscribe((name) => {
                console.log('Account in header: ', name);
                this.name = name;
                this.accountService.getAccountByName(name);
            });
    }

    goBack() {
        if (this.urlSegment === 'dashboard') {
            this.router.navigate([RoutePath.AccountSelection]);
        } else if (
            this.urlSegment === 'history' ||
            this.urlSegment === 'plan' ||
            this.urlSegment === 'overview'
        ) {
            this.router.navigate([routeToDashboard(this.name)]);
        } else {
            return;
        }
    }

    isOnAccountSelectionPage(): boolean {
        return this.urlSegment === RoutePath.AccountSelection;
    }

    goToAccountSelection() {
        this.router.navigate([RoutePath.AccountSelection]);
    }

    get pageTitle(): string {
        const pageName = this.router.url.split('/')[3];
        switch (pageName) {
            case 'dashboard':
                return 'Dashboard';
            case 'overview':
                return 'Overview';
            case 'history':
                return 'History';
            case 'plan':
                return 'Plan';
            default:
                return '';
        }
    }

    onLogout(event: Event) {
        event.preventDefault();
        this.accountService.logoutOrDeselectAccount();
        this.router.navigate(['/logout']);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
