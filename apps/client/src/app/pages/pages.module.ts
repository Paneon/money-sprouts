import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSelectionComponent } from './user-selection/user-selection.component';
import { SharedModule } from '../../shared/shared.module';
import { StartComponent } from './start/start.component';
import { BalanceOverviewComponent } from './balance-overview/balance-overview.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PlanComponent } from './plan/plan.component';
import { UserService } from '../services/user.service';
import { PlanExpensesComponent } from './plan/plan-expenses/plan-expenses.component';
import { PlanEarningsComponent } from './plan/plan-earnings/plan-earnings.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, SharedModule, FormsModule],
    declarations: [
        UserSelectionComponent,
        StartComponent,
        BalanceOverviewComponent,
        TransactionHistoryComponent,
        DashboardComponent,
        LoginComponent,
        UserSelectionComponent,
        PlanComponent,
        PlanExpensesComponent,
        PlanEarningsComponent,
    ],
    exports: [
        UserSelectionComponent,
        StartComponent,
        BalanceOverviewComponent,
        TransactionHistoryComponent,
        DashboardComponent,
        LoginComponent,
        UserSelectionComponent,
        PlanComponent,
        CommonModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [UserService],
})
export class PagesModule {}
