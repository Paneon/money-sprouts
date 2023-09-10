import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultilanguageComponent } from './multilanguage.component';

describe('MultilanguageComponent', () => {
  let component: MultilanguageComponent;
  let fixture: ComponentFixture<MultilanguageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultilanguageComponent]
    });
    fixture = TestBed.createComponent(MultilanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
