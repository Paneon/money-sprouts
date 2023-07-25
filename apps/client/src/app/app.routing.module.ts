import {NgModule} from "@angular/core";
import {RouterModule, Routes} from '@angular/router';
import {UserSelectionComponent} from "./pages/user-selection/user-selection.component";
import {StartComponent} from "./pages/start/start.component";

import {CommonModule} from "@angular/common";
import { BalanceOverviewComponent } from "./pages/balance-overview/balance-overview.component";
import { TransactionHistoryComponent } from "./pages/transaction-history/transaction-history.component";

const routes: Routes = [
  {
    path: 'startpage',
    component: StartComponent,
  },
  {
    path: 'userselection',
    component: UserSelectionComponent,
    children: [
      { path: ':username/overview', component: BalanceOverviewComponent},
      { path: ':username/transactionhistory', component: TransactionHistoryComponent}
    ]
  }

  ,
  {
    path: '**',
    redirectTo: 'startpage'
  }
];

@NgModule({
  declarations: [],
  imports: [ CommonModule, RouterModule.forRoot(routes,  {enableTracing: false})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
