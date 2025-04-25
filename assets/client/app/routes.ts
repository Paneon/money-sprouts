import { Routes } from '@angular/router';
import { StartComponent } from './pages/start/start.component';
import { BalanceOverviewComponent } from './pages/balance-overview/balance-overview.component';
import { TransactionHistoryComponent } from './pages/transaction-history/transaction-history.component';
import { PlanComponent } from './pages/plan/plan.component';
import { AccountSelectionComponent } from './pages/account-selection/account-selection.component';
import { RoutePath } from './enum/routepath';
import { RouteId } from './enum/route-id';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { accountsResolver } from './services/accounts-resolver.service';

export const routes: Routes = [
    {
        path: '',
        redirectTo: RoutePath.Home,
        pathMatch: 'full',
    },
    {
        path: RoutePath.Home,
        component: StartComponent,
        data: { routeId: RouteId.Home },
    },
    {
        path: RoutePath.AccountSelection,
        component: AccountSelectionComponent,
        data: { routeId: RouteId.AccountSelection },
    },
    {
        path: RoutePath.AccountDashboard,
        component: DashboardComponent,
        resolve: { accounts: accountsResolver },
        data: { routeId: RouteId.AccountDashboard },
    },
    {
        path: RoutePath.Balance,
        component: BalanceOverviewComponent,
        data: { routeId: RouteId.Balance },
    },
    {
        path: RoutePath.History,
        component: TransactionHistoryComponent,
        data: { routeId: RouteId.History },
    },
    {
        path: RoutePath.Plan,
        component: PlanComponent,
        data: { routeId: RouteId.Plan },
    },
    {
        path: '**',
        redirectTo: RoutePath.Home,
    },
];
