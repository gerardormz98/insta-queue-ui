import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { WaitlistHostService } from '../services/waitlist-host.service';
import { LocalUserIdService } from '../services/local-user-id.service';
import { catchError, map, of, take } from 'rxjs';
import { ROUTE_NAME_WAITLIST, ROUTE_PARAM_WAITLIST_CODE } from '../constants';

export const redirectIfUserIsEnqueuedGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let waitlistHostService = inject(WaitlistHostService);
  let userIdService = inject(LocalUserIdService);

  return waitlistHostService.getWaitlistByUserId(userIdService.getUserId()).pipe(
    take(1),
    map((waitlistCode) => {
      if (waitlistCode) {
        let isOnCurrentWaitlistPage = route.routeConfig?.path?.startsWith(`${ROUTE_NAME_WAITLIST}/`) && route.params[ROUTE_PARAM_WAITLIST_CODE] === waitlistCode;

        if (!isOnCurrentWaitlistPage) {
          router.navigate([ROUTE_NAME_WAITLIST, waitlistCode], { replaceUrl: true });
          return false;
        }
      }

      return true;
    }),
    catchError((err) => {
      return of(false);
    })
  );
};
