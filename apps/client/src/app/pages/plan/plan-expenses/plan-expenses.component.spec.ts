import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanExpensesComponent } from './plan-expenses.component';

describe('PlanExpensesComponent', () => {
  let component: PlanExpensesComponent;
  let fixture: ComponentFixture<PlanExpensesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanExpensesComponent]
    });
    fixture = TestBed.createComponent(PlanExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
