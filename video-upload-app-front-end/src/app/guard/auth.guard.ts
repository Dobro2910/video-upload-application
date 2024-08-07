// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { AuthenticationService } from '../service/authentication.service';
// import { JwtHelperService } from '@auth0/angular-jwt';

// export const AuthGuard: CanActivateFn = (route, state) => {
//   const service = inject(AuthenticationService); // Inject the authentication service
//   const router = inject(Router); // Inject the router service
//   const jwtHelper = new JwtHelperService(); // Create an instance of JwtHelperService to manage JWT tokens
//   const token = service.getToken(); // Retrieve the JWT token from local storage

//   if (token && !jwtHelper.isTokenExpired(token)) {
//     return true; // Allow access if the token is valid and not expired
//   } else {
//     // Redirect to the login page if the token is missing or expired
//     // The `queryParams` object contains a `returnUrl` key which is set to the URL the user attempted to access
//     router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
//     return false; // Deny access
//   }
// };

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const jwtHelper = new JwtHelperService(); // Create an instance of JwtHelperService to manage JWT tokens
    const token = this.authService.getToken(); // Retrieve the JWT token from local storage

    console.log(token);

    if (token && !jwtHelper.isTokenExpired(token)) {
      return true; // Allow access if the token is valid and not expired
    } else {
      // Redirect to the login page if the token is missing or expired
      // The `queryParams` object contains a `returnUrl` key which is set to the URL the user attempted to access
      console.log("Redirecting to login page...");
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false; // Deny access
    }
  }
}
