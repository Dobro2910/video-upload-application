import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserRole } from '../store/model/user.model';

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

    if (token && !jwtHelper.isTokenExpired(token)) {
      const decodedToken = jwtHelper.decodeToken(token);
      const userRole = decodedToken.role as UserRole;
      const allowedRoles = route.data['roles'] as UserRole[];
        if (allowedRoles && allowedRoles.includes(userRole)) {
          return true; // Allow access if the user's role is in the list of allowed roles
        } else {
          this.router.navigate(['/login']); // Redirect to unauthorized page if role doesn't match
          return false; // Deny access
        }
    } else {
      // Redirect to the login page if the token is missing or expired
      // The `queryParams` object contains a `returnUrl` key which is set to the URL the user attempted to access
      console.log("Redirecting to login page...");
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false; // Deny access
    }
  }
}
