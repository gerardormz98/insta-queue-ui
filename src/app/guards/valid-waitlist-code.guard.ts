import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ROUTE_PARAM_WAITLIST_CODE } from '../constants';
import { WaitlistHostService } from '../services/waitlist-host.service';
import { catchError, map, of, take } from 'rxjs';

export const validWaitlistCodeGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let waitlistHostService = inject(WaitlistHostService);

  let waitlistCode = route.params[ROUTE_PARAM_WAITLIST_CODE];

  return waitlistHostService.getWaitlistHost(waitlistCode).pipe(
    take(1),
    map(() => {
      return true;
    }),
    catchError(() => {
      router.navigate([''], { replaceUrl: true });
      return of(false);
    })
  );
};


