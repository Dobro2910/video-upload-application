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

  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.userLoginAction), // Listen for user login action
      mergeMap(action =>
        this.authService.UserLogin(action.userlogincredential).pipe(
          map((response: any) => {
            // Assuming backend returns a token upon successful login
            return AuthActions.userLoginSuccess({ token: response.token });
          }),
          catchError(error => {
            // Handle login failure, return error message
            return of(AuthActions.userLoginFailure({ error: error.message }));
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.userLoginSuccess),
      tap(() => {
        this.authService.UserLoginSuccess();
      })
    ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.userLoginFailure),
      tap(() => {
        // Optionally show error message or handle UI state
        // Here, you might want to store the error in state or display a message
      })
    ),
    { dispatch: false } // We don't need to dispatch any new actions here
  );

  // Add other effects if needed, such as registration, logout, etc.
}
