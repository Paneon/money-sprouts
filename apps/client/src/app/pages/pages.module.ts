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
import { UserService } from '../services/user.service';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [
    UserSelectionComponent,
    StartComponent,
    BalanceOverviewComponent,
    TransactionHistoryComponent,
    DashboardComponent,
    LoginComponent,
    UserSelectionComponent,
    SpendingsComponent,
  ],
  exports: [
    UserSelectionComponent,
    StartComponent,
    BalanceOverviewComponent,
    TransactionHistoryComponent,
    DashboardComponent,
    LoginComponent,
    UserSelectionComponent,
    SpendingsComponent,
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [UserService],
})
export class PagesModule {}
