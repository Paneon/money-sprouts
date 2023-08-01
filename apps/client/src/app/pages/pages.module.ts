import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSelectionComponent } from './user-selection/user-selection.component';
import { SharedModule } from '../../shared/shared.module';
import { StartComponent } from './start/start.component';
import { BalanceOverviewComponent } from './balance-overview/balance-overview.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SpendingsComponent } from './spendings/spendings.component';

const components = [UserSelectionComponent];
const modules = [CommonModule, SharedModule];

@NgModule({
  declarations: [
    ...components,
    StartComponent,
    BalanceOverviewComponent,
    TransactionHistoryComponent,
    DashboardComponent,
    LoginComponent,
    UserSelectionComponent,
    SpendingsComponent,
  ],
  imports: [...modules],
  exports: [...components, ...modules],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
})
export class PagesModule {}
