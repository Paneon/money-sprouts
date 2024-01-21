import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanExpensesComponent } from './plan-expenses.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

describe('PlanExpensesComponent', () => {
    let component: PlanExpensesComponent;
    let fixture: ComponentFixture<PlanExpensesComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, TranslateModule.forRoot(), FormsModule],
            declarations: [PlanExpensesComponent],
        });
        fixture = TestBed.createComponent(PlanExpensesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
