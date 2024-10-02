import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import { ProfileService } from '../../service/profile.service';
import * as ProfileActions from '../profile/profile.action';

@Injectable()
export class ProfileEffects {
  GetProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.getProfileAction), // Listen for user login action
      mergeMap(action => this.profileService.GetProfile(action.userEmail).pipe(
          map(response => {
            return ProfileActions.getProfileActionSuccess({ user: response.user });
          }),
          catchError(error => {
            // Handle login failure, return error message
            console.error('Get user profile failed: ', error);

            return of(ProfileActions.getProfileActionFailure({ error: error }));
          })
        )
      )
    )
  );

  updateUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.updateProfileAction),
      // take(1),
      mergeMap(action =>
        this.profileService.UpdateProfile(action.updateUser, action.userEmail).pipe(
          map(() => ProfileActions.updateProfileActionSuccess({ comment: 'Update User Successful' })),
          catchError(error => {
            console.error('Update profile failed:', error);

            let errorMessage;
            if (error.status === 401) {
              errorMessage = "Email Already Exist";
            } else {
              errorMessage = "An Error Have Occur When Update User Profile";
            }
            return of(ProfileActions.updateProfileActionFailure({ error: errorMessage }));
          })  
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
    private router: Router
  ) {}

  // Add other effects if needed, such as registration, logout, etc.
}
