import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSelectionComponent } from './pages/account-selection/account-selection.component';
import { StartComponent } from './pages/start/start.component';

import { CommonModule } from '@angular/common';
import { BalanceOverviewComponent } from './pages/balance-overview/balance-overview.component';
import { TransactionHistoryComponent } from './pages/transaction-history/transaction-history.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { SpendingsComponent } from './pages/spendings/spendings.component';
import { AccountsResolver } from './services/accounts-resolver.service';

export enum RoutePath {
    Home = 'home',
    Login = 'login',
    AccountSelection = 'accountselection',
    Dashboard = 'account/:name/dashboard',
    Overview = 'account/:name/overview',
    History = 'account/:name/history',
    Plan = 'account/:name/plan',
}

export function routeToDashboard(name: string) {
    name = decodeURI(name);
    return RoutePath.Dashboard.replace(':name', name);
}

export function routeToOverview(name: string) {
    console.log({ name });
    name = decodeURI(name);
    return RoutePath.Overview.replace(':name', name);
}

export function routeToHistory(name: string) {
    name = decodeURI(name);
    return RoutePath.History.replace(':name', name);
}

export function routeToPlan(name: string) {
    name = decodeURI(name);
    return RoutePath.Plan.replace(':name', name);
}

const routes: Routes = [
    {
        path: '',
        redirectTo: RoutePath.Home,
        pathMatch: 'full',
    },
    {
        path: RoutePath.Home,
        component: StartComponent,
    },
    {
        path: RoutePath.Login,
        component: LoginComponent,
    },
    {
        path: RoutePath.AccountSelection,
        component: AccountSelectionComponent,
        resolve: { accounts: AccountsResolver },
    },
    {
        path: RoutePath.Dashboard,
        component: DashboardComponent,
    },
    {
        path: RoutePath.Overview,
        component: BalanceOverviewComponent,
    },
    {
        path: RoutePath.History,
        component: TransactionHistoryComponent,
    },
    {
        path: RoutePath.Plan,
        component: SpendingsComponent,
    },
    {
        path: '**',
        redirectTo: 'home',
    },
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes, { enableTracing: false }),
    ],
    exports: [RouterModule, CommonModule],
})
export class AppRoutingModule {}
