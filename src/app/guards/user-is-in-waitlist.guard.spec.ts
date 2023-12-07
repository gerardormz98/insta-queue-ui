import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userIsInWaitlistGuard } from './user-is-in-waitlist.guard';

describe('userIsInWaitlistGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userIsInWaitlistGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
