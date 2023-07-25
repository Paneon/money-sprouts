import {NgModule} from "@angular/core";
import {RouterModule, Routes} from '@angular/router';
import {UserSelectionComponent} from "./pages/user-selection/user-selection.component";
import {CommonModule} from "@angular/common";

const routes: Routes = [
  {
    path: 'startpage',
    // component: StartPageComponent,
    redirectTo: 'useroverview'
  },
  {
    path: 'useroverview',
    component: UserSelectionComponent,
    /**children: [
      { path: 'overview', component: BalanceOverviewComponent},
      { path: 'transactionhistory', component: TransactionHistoryComponent}
    ]**/
  },
  {
    path: '**',
    redirectTo: 'startpage',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [ CommonModule, RouterModule.forRoot(routes,  {enableTracing: false})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
