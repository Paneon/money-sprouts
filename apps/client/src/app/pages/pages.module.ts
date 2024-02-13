import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { PlanComponent } from './plan/plan.component';
import { AccountService } from '../services/account.service';
import { PlanExpensesComponent } from './plan/plan-expenses/plan-expenses.component';
import { PlanEarningsComponent } from './plan/plan-earnings/plan-earnings.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [CommonModule, SharedModule, FormsModule, TranslateModule],
    declarations: [
        TransactionHistoryComponent,
        PlanComponent,
        PlanExpensesComponent,
        PlanEarningsComponent,
    ],
    exports: [
        TransactionHistoryComponent,
        PlanComponent,
        PlanExpensesComponent,
        PlanEarningsComponent,
        CommonModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [AccountService],
})
export class PagesModule {}
