import { TestBed } from '@angular/core/testing';

import { ConfettiStateService } from './confetti-state.service';

describe('ConfettiStateService', () => {
  let service: ConfettiStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfettiStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
