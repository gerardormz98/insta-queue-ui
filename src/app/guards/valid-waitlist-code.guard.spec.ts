import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { validWaitlistCodeGuard } from './valid-waitlist-code.guard';

describe('validWaitlistCodeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => validWaitlistCodeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
