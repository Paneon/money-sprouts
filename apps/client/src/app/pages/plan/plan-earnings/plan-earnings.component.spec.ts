import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanEarningsComponent } from './plan-earnings.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

describe('PlanEarningsComponent', () => {
    let component: PlanEarningsComponent;
    let fixture: ComponentFixture<PlanEarningsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, TranslateModule.forRoot(), FormsModule],
            declarations: [PlanEarningsComponent],
        });
        fixture = TestBed.createComponent(PlanEarningsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
