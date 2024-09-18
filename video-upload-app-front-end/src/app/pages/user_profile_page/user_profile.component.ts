import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../store/model/user.model';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../../service/authentication.service';
import { Store } from '@ngrx/store';
import { ProfileState } from '../../store/profile/profile.reducer';
import * as ProfileActions from '../../store/profile/profile.action';
import { UpdateProfileDialogComponent } from '../shared/update_profile_dialog/update_profile_dialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user_profile.component.html',
  styleUrls: ['./user_profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  // Observable Variables
  currentUser$: Observable<User| null>;

  constructor(private store: Store<{ profile: ProfileState }>, private authService: AuthenticationService, private dialog: MatDialog) { 
    this.currentUser$ = this.store.select(state => state.profile.currentUser);
  }

  ngOnInit(): void {
    const userEmail = this.authService.getUserEmailFromToken();

    if (userEmail) {
      this.store.dispatch(ProfileActions.getProfileAction({userEmail: userEmail}));
    } else {
      this.store.dispatch(ProfileActions.getProfileActionFailure({error: "Cannot find current session token"}));
    }

    console.log('User profile component initialized');
  }

  displayProfileUpdateDialog(): void {
    this.dialog.open(UpdateProfileDialogComponent);
  }
}