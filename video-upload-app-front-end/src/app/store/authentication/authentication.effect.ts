import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthenticationService } from '../../service/authentication.service';
import * as AuthActions from '../authentication/authentication.action';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {

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
      tap(({ error }) => {
        // Optionally show error message or handle UI state
        console.error('Login failed:', error); // You might want to display this in the UI
      })
    ),
    { dispatch: false } // We don't need to dispatch any new actions here
  );

  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
  ) {}

  // Add other effects if needed, such as registration, logout, etc.
}
