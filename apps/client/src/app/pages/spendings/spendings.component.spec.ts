import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpendingsComponent } from './spendings.component';

describe('SpendingsComponent', () => {
  let component: SpendingsComponent;
  let fixture: ComponentFixture<SpendingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpendingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpendingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
