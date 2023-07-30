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

const routes: Routes = [
  {
    path: '',
    component: StartComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'userselection',
    component: UserSelectionComponent,
  },
  {
    path: ':username/dashboard',
    component: DashboardComponent,
  },
  {
    path: ':username/overview',
    component: BalanceOverviewComponent,
  },
  {
    path: ':username/history',
    component: TransactionHistoryComponent,
  },
  {
    path: ':username/plan',
    component: SpendingsComponent,
  },
  {
    path: '**',
    redirectTo: 'startpage',
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { enableTracing: false }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
