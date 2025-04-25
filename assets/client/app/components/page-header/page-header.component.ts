import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { distinctUntilChanged, Observable, Subject } from 'rxjs';
import { Account } from '../../types/account';
import { TranslateService } from '@ngx-translate/core';
import { RoutePath } from '../../enum/routepath';
import { RouteId } from '../../enum/route-id';
import { RouterService } from '../../services/router.service';
import {
    Router,
    NavigationEnd,
    RouterModule,
    ActivatedRoute,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MultilanguageComponent } from '../multilanguage/multilanguage.component';

@Component({
    selector: 'money-sprouts-page-header',
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.scss'],
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule,
        MultilanguageComponent,
    ]
})
export class PageHeaderComponent implements OnInit, OnDestroy {
    childClass: string;
    name: string;
    account$: Observable<Account | null>;
    currentRouteId: RouteId;
    logout = 'Logout';
    avatar: string;
    id: number;

    isLoading = false;

    private destroy$ = new Subject<void>();

    constructor(
        private readonly routerService: RouterService,
        public accountService: AccountService,
        public translate: TranslateService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.accountService.loading.subscribe((loading: boolean) => {
            this.isLoading = loading;
        });
    }

    ngOnInit() {
        // Set initial route
        this.updateRouteInfo();

        this.router.events
            .pipe(
                filter(
                    (event): event is NavigationEnd =>
                        event instanceof NavigationEnd
                ),
                distinctUntilChanged()
            )
            .subscribe(() => {
                this.updateRouteInfo();
            });

        this.account$ = this.accountService.currentAccount$.pipe(
            distinctUntilChanged()
        );

        this.accountService.currentAccount$.subscribe(
            (account: Account | null) => {
                this.name = account?.name ?? '';
            }
        );
    }

    private updateRouteInfo() {
        let currentRoute = this.route;
        while (currentRoute.firstChild) {
            currentRoute = currentRoute.firstChild;
        }
        this.currentRouteId = currentRoute.snapshot.data['routeId'] as RouteId;

        // Get account name from URL
        const urlSegments = this.router.url.split('/');
        this.name = decodeURIComponent(urlSegments[2]);
    }

    goBack() {
        console.log('goBack', this.currentRouteId);
        if (this.currentRouteId === RouteId.AccountDashboard) {
            this.routerService.navigateToRoute(RoutePath.AccountSelection);
        } else if (
            this.currentRouteId === RouteId.History ||
            this.currentRouteId === RouteId.Plan ||
            this.currentRouteId === RouteId.Balance
        ) {
            this.routerService.navigateToAccountDashboard(this.name);
        }
    }

    isOnAccountSelectionPage(): boolean {
        return this.currentRouteId === RouteId.AccountSelection;
    }

    goToAccountSelection() {
        this.routerService.navigateToRoute(RoutePath.AccountSelection);
    }

    get pageTitle(): string {
        switch (this.currentRouteId) {
            case RouteId.AccountDashboard:
                return 'PAGE_HEADER.PAGE_NAME.DASHBOARD';
            case RouteId.Balance:
                return 'PAGE_HEADER.PAGE_NAME.OVERVIEW';
            case RouteId.History:
                return 'PAGE_HEADER.PAGE_NAME.HISTORY';
            case RouteId.Plan:
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
