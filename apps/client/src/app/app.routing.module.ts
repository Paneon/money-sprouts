import {NgModule} from "@angular/core";
import {RouterModule, Routes} from '@angular/router';
import {UserSelectionComponent} from "./pages/user-selection/user-selection.component";
import {StartComponent} from "./pages/start/start.component";

import {CommonModule} from "@angular/common";

const routes: Routes = [
  {
    path: 'startpage',
    component: StartComponent,
  },
  {
    path: 'useroverview',
    component: UserSelectionComponent
  }
    /**children: [
      { path: 'overview', component: BalanceOverviewComponent},
      { path: 'transactionhistory', component: TransactionHistoryComponent}
    ]**/
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
