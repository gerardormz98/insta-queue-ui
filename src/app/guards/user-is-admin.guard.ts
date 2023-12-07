import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ROUTE_PARAM_WAITLIST_CODE } from '../constants';
import { LoginService } from '../services/login.service';

export const userIsAdminGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let loginService = inject(LoginService);
  let waitlistCodeInUrl = route.params[ROUTE_PARAM_WAITLIST_CODE];
  let token = loginService.getToken();

  if (!token || !loginService.validateToken(token) || loginService.getTokenPayload(token).waitlist_code !== waitlistCodeInUrl) {
    loginService.logout();
    router.navigate(['admin-access', waitlistCodeInUrl], { replaceUrl: true });
    return false;
  }

  return true;
};
