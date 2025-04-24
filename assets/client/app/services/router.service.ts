import { Injectable } from '@angular/core';
import { RoutePath } from '../enum/routepath';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class RouterService {
    constructor(public router: Router) {}

    getURL() {
        return this.router.url;
    }

    navigateToRoute(path: RoutePath) {
        return this.router.navigate([path]);
    }

    navigateToRouteForAccountName(path: RoutePath, accountName: string) {
        if (
            typeof accountName !== 'string' ||
            accountName.trim().length === 0
        ) {
            throw Error(
                'Empty accountName provided to navigateToRouteForAccountName.'
            );
        }
        const name = decodeURI(accountName);
        const target = path.replace(':name', encodeURI(name));
        return this.router.navigate([target]);
    }

    navigateToAccountDashboard(name: string) {
        return this.navigateToRouteForAccountName(
            RoutePath.AccountDashboard,
            name
        );
    }

    navigateToOverview(name: string) {
        return this.navigateToRouteForAccountName(RoutePath.Balance, name);
    }

    navigateToHistory(name: string) {
        return this.navigateToRouteForAccountName(RoutePath.History, name);
    }

    navigateToPlan(name: string) {
        return this.navigateToRouteForAccountName(RoutePath.Plan, name);
    }
}
