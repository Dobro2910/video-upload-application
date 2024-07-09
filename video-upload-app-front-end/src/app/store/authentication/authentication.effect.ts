import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthenticationService } from '../../service/authentication.service';
import * as AuthActions from '../authentication/authentication.action';
import { tap } from 'rxjs/operators';

import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.userLoginAction), // Listen for user login action
      mergeMap(action =>
        this.authService.UserLogin(action.userlogincredential).pipe(
          tap((response: any) => {
            this.authService.storeToken(response.token); // Store token in local storage
            this.router.navigate(['/home']); // Navigate to home on success

            // return AuthActions.userLoginActionSuccess({ token: response.token });
          }),
          map((response: any) => AuthActions.userLoginActionSuccess()),
          catchError(error => {
            // Handle login failure, return error message
            console.error('Login failed:', error);

            let errorMessage;
            if (error.status === 401) {
              errorMessage = "Invalid Credential";
            } else {
              errorMessage = "An Error Have Occur When Logging In";
            }

            return of(AuthActions.userLoginActionFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.createUserAction),
        mergeMap(action =>
          this.authService.UserRegister(action.user).pipe(
            tap((response: any) => {
              this.router.navigate(['/login']); // Navigate to home on success
              // return AuthActions.createUserActionSuccess({ message: response.message });
            }),
            map((response: any) => AuthActions.createUserActionSuccess()),
            catchError(error => {
              console.error('Register failed:', error);

              let errorMessage;
              if (error.status === 401) {
                errorMessage = "Email Already Exist";
              } else {
                errorMessage = "An Error Have Occur When Register";
              }
              return of(AuthActions.createUserActionFailure({ error: errorMessage }));
            })  
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  // Add other effects if needed, such as registration, logout, etc.
}
