import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { BalanceOverviewComponent } from './pages/balance-overview/balance-overview.component';
import { TransactionHistoryComponent } from './pages/transaction-history/transaction-history.component';
import { LoginComponent } from './pages/login/login.component';
import { PlanComponent } from './pages/plan/plan.component';
import { AccountSelectionComponent } from './pages/account-selection/account-selection.component';
import { AccountsResolver } from './services/accounts-resolver.service';
import { RoutePath } from './enum/routepath';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: RoutePath.Home,
        pathMatch: 'full',
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
        component: PlanComponent,
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
