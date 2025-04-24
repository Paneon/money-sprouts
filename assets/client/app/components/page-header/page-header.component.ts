import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { distinctUntilChanged, Observable, Subject } from 'rxjs';
import { Account } from '../../types/account';
import { TranslateService } from '@ngx-translate/core';
import { RoutePath } from '../../enum/routepath';
import { RouterService } from '../../services/router.service';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'money-sprouts-page-header',
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.scss'],
    standalone: true,
    imports: [CommonModule, TranslateModule, RouterModule],
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

    constructor(
        private readonly routerService: RouterService,
        public accountService: AccountService,
        public translate: TranslateService
    ) {
        this.accountService.loading.subscribe((loading: boolean) => {
            this.isLoading = loading;
        });
    }

    ngOnInit() {
        const urlSegments = this.routerService.getURL().split('/');
        this.urlSegment = urlSegments[urlSegments.length - 1];
        this.name = urlSegments[2];

        this.account$ = this.accountService.currentAccount$.pipe(
            distinctUntilChanged()
        );

        this.accountService.currentAccount$.subscribe(
            (account: Account | null) => {
                this.name = account?.name ?? '';
            }
        );
    }

    goBack() {
        if (this.urlSegment === 'dashboard') {
            this.routerService.navigateToRoute(RoutePath.AccountSelection);
        } else if (
            this.urlSegment === 'history' ||
            this.urlSegment === 'plan' ||
            this.urlSegment === 'overview'
        ) {
            this.routerService.navigateToDashboard(this.name);
        } else {
            return;
        }
    }

    isOnAccountSelectionPage(): boolean {
        return this.urlSegment === RoutePath.AccountSelection;
    }

    goToAccountSelection() {
        this.routerService.navigateToRoute(RoutePath.AccountSelection);
    }

    get pageTitle(): string {
        const pageName = this.routerService.getURL().split('/')[3];
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
        this.routerService.navigateToRoute(RoutePath.Logout);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
