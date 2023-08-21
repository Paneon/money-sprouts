import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanEarningsComponent } from './plan-earnings.component';

describe('PlanEarningsComponent', () => {
  let component: PlanEarningsComponent;
  let fixture: ComponentFixture<PlanEarningsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanEarningsComponent]
    });
    fixture = TestBed.createComponent(PlanEarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
