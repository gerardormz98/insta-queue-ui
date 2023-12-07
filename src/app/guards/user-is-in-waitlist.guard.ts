import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ROUTE_NAME_ENQUEUE, ROUTE_PARAM_WAITLIST_CODE } from '../constants';
import { WaitlistHostService } from '../services/waitlist-host.service';
import { LocalUserIdService } from '../services/local-user-id.service';
import { catchError, map, of, take } from 'rxjs';

export const userIsInWaitlistGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let waitlistHostService = inject(WaitlistHostService);
  let userIdService = inject(LocalUserIdService);

  let waitlistCodeInUrl = route.params[ROUTE_PARAM_WAITLIST_CODE];

  return waitlistHostService.getWaitlistByUserId(userIdService.getUserId()).pipe(
    take(1),
    map((userWaitlistCode) => {
      if (userWaitlistCode !== waitlistCodeInUrl) {
        router.navigate([ROUTE_NAME_ENQUEUE, waitlistCodeInUrl], { replaceUrl: true });
        return false;
      }

      return true;
    }),
    catchError((err) => {
      return of(false);
    })
  );
};
