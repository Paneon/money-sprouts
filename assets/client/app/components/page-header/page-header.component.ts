import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../../app/services/account.service';
import { distinctUntilChanged, Observable, Subject } from 'rxjs';
import { Account } from '../../app/types/account';
import { TranslateService } from '@ngx-translate/core';
import { RoutePath } from '../../app/enum/routepath';
import { RouterService } from '../../app/services/router.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'money-sprouts-page-header',
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit, OnDestroy {
    childClass: string = '';
    name: string = '';
    account$: Observable<Account | null>;
    urlSegment: string = '';
    logout = 'Logout';
    avatar: string = '';
    id: number = 0;
    isLoading = false;

    private destroy$ = new Subject<void>();

    constructor(
        private readonly router: RouterService,
        public accountService: AccountService,
        public translate: TranslateService,
        private router: Router
    ) {
        this.accountService.loading.subscribe((loading) => {
            this.isLoading = loading;
        });
        this.account$ = this.accountService.currentAccount$;
    }

    ngOnInit() {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => {
                const segments = this.router.url.split('/');
                this.urlSegment = segments[segments.length - 1];
            });

        this.account$.subscribe((account) => {
            if (account) {
                this.name = account.name;
                this.avatar = account.avatar;
                this.id = account.id;
            }
        });
    }

    goBack() {
        if (this.urlSegment === 'dashboard') {
            this.router.navigateToRoute(RoutePath.AccountSelection);
        } else if (
            this.urlSegment === 'history' ||
            this.urlSegment === 'plan' ||
            this.urlSegment === 'overview'
        ) {
            this.router.navigateToDashboard(this.name);
        } else {
            return;
        }
    }

    isOnAccountSelectionPage(): boolean {
        return this.urlSegment === RoutePath.AccountSelection;
    }

    goToAccountSelection() {
        this.router.navigateToRoute(RoutePath.AccountSelection);
    }

    get pageTitle(): string {
        const pageName = this.router.getURL().split('/')[3];
        switch (pageName) {
            case 'dashboard':
                return 'PAGE_HEADER.PAGE_NAME.DASHBOARD';
            case 'overview':
                return 'PAGE_HEADER.PAGE_NAME.OVERVIEW';
            case 'history':
                return 'PAGE_HEADER.PAGE_NAME.HISTORY';
            case 'plan':
                return 'PAGE_HEADER.PAGE_NAME.PLAN';
            default:
                return '';
        }
    }

    get welcomeTitle(): string {
        return 'PAGE_HEADER.PAGE_NAME.ACCOUNT-SELECTION';
    }

    onLogout(event: Event) {
        event.preventDefault();
        this.accountService.logoutOrDeselectAccount();
        this.router.navigateToRoute(RoutePath.Logout);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
