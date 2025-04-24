import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PlanExpensesComponent } from './plan-expenses.component';

describe('PlanExpensesComponent', () => {
    let component: PlanExpensesComponent;
    let fixture: ComponentFixture<PlanExpensesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                FormsModule,
                TranslateModule.forRoot(),
                PlanExpensesComponent,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(PlanExpensesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render form elements', () => {
        const compiled = fixture.nativeElement;
        const form = compiled.querySelector('form');
        const amountInput = compiled.querySelector('input[name="amount"]');
        const titleInput = compiled.querySelector('input[name="title"]');
        const submitButton = compiled.querySelector('button[type="submit"]');

        expect(form).toBeTruthy();
        expect(amountInput).toBeTruthy();
        expect(titleInput).toBeTruthy();
        expect(submitButton).toBeTruthy();
    });
});
