import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';

export const authGuard: CanActivateFn = (route, state) => {
  const service = inject(AuthenticationService);
  const router = inject(Router);
  const jwtHelper = new JwtHelperService();
  const token = localStorage.getItem('token'); // or use another storage mechanism

  if (token && !jwtHelper.isTokenExpired(token)) {
    return true;
  } else {
    router.navigate(['login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};
