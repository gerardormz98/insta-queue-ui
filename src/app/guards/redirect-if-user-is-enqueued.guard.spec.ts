import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { redirectIfUserIsEnqueuedGuard } from './redirect-if-user-is-enqueued.guard';

describe('redirectIfUserIsEnqueuedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => redirectIfUserIsEnqueuedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
