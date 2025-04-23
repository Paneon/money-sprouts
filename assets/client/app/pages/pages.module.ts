import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSelectionComponent } from './account-selection/account-selection.component';
import { SharedModule } from '../../shared/shared.module';
import { StartComponent } from './start/start.component';
import { BalanceOverviewComponent } from './balance-overview/balance-overview.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PlanComponent } from './plan/plan.component';
import { AccountService } from '../services/account.service';
import { PlanExpensesComponent } from './plan/plan-expenses/plan-expenses.component';
import { PlanEarningsComponent } from './plan/plan-earnings/plan-earnings.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [CommonModule, SharedModule, FormsModule, TranslateModule],
    declarations: [
        AccountSelectionComponent,
        StartComponent,
        BalanceOverviewComponent,
        TransactionHistoryComponent,
        DashboardComponent,
        LoginComponent,
        PlanComponent,
        PlanExpensesComponent,
        PlanEarningsComponent,
    ],
    exports: [
        AccountSelectionComponent,
        StartComponent,
        BalanceOverviewComponent,
        TransactionHistoryComponent,
        DashboardComponent,
        LoginComponent,
        PlanComponent,
        PlanExpensesComponent,
        PlanEarningsComponent,
        CommonModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [AccountService],
})
export class PagesModule {}
