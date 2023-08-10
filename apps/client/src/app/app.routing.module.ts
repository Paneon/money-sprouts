import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSelectionComponent } from './pages/user-selection/user-selection.component';
import { StartComponent } from './pages/start/start.component';

import { CommonModule } from '@angular/common';
import { BalanceOverviewComponent } from './pages/balance-overview/balance-overview.component';
import { TransactionHistoryComponent } from './pages/transaction-history/transaction-history.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { SpendingsComponent } from './pages/spendings/spendings.component';
import { UsersResolver } from './services/users-resolver.service';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: StartComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'userselection',
        component: UserSelectionComponent,
        resolve: { users: UsersResolver },
    },
    {
        path: 'user/:username/dashboard',
        component: DashboardComponent,
    },
    {
        path: 'user/:username/overview',
        component: BalanceOverviewComponent,
    },
    {
        path: 'user/:username/history',
        component: TransactionHistoryComponent,
    },
    {
        path: 'user/:username/plan',
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
