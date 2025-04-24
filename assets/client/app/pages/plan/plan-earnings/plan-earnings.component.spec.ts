import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PlanEarningsComponent } from './plan-earnings.component';

describe('PlanEarningsComponent', () => {
    let component: PlanEarningsComponent;
    let fixture: ComponentFixture<PlanEarningsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                FormsModule,
                TranslateModule.forRoot(),
                PlanEarningsComponent,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(PlanEarningsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render chore items', () => {
        const compiled = fixture.nativeElement;
        const choreItems = compiled.querySelectorAll('.chore-item');
        expect(choreItems.length).toBe(component.chores.length);
    });

    it('should render submit button', () => {
        const compiled = fixture.nativeElement;
        const submitButton = compiled.querySelector('button[type="submit"]');
        expect(submitButton).toBeTruthy();
    });
});
