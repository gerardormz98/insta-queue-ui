import { TestBed } from '@angular/core/testing';

import { LiveWaitlistService } from './live-waitlist.service';

describe('LiveWaitlistService', () => {
  let service: LiveWaitlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveWaitlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
