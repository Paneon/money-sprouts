import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSelectionComponent } from './account-selection/account-selection.component';
import { SharedModule } from '../../shared/shared.module';
import { StartComponent } from './start/start.component';
import { BalanceOverviewComponent } from './balance-overview/balance-overview.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SpendingsComponent } from './spendings/spendings.component';
import { AccountService } from '../services/account.service';

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [
        AccountSelectionComponent,
        StartComponent,
        BalanceOverviewComponent,
        TransactionHistoryComponent,
        DashboardComponent,
        LoginComponent,
        SpendingsComponent,
    ],
    exports: [
        AccountSelectionComponent,
        StartComponent,
        BalanceOverviewComponent,
        TransactionHistoryComponent,
        DashboardComponent,
        LoginComponent,
        SpendingsComponent,
        CommonModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [AccountService],
})
export class PagesModule {}
