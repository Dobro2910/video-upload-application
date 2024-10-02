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
  comment$: Observable<string | null>;

  showComment = false;
  comment: string | null = null;

  constructor(private store: Store<{ profile: ProfileState }>, private authService: AuthenticationService, private dialog: MatDialog) { 
    this.currentUser$ = this.store.select(state => state.profile.currentUser);
    this.comment$ = this.store.select(state => state.profile.comment);
  }

  ngOnInit(): void {
    const userEmail = this.authService.getUserEmailFromToken();

    if (userEmail) {
      this.store.dispatch(ProfileActions.getProfileAction({userEmail: userEmail}));
    } else {
      this.store.dispatch(ProfileActions.getProfileActionFailure({error: "Cannot find current session token"}));
    }

    this.comment$.pipe().subscribe(comment => {
      if (comment) {
        this.showCommentWithTimeout(comment);
      }
    });

    console.log('User profile component initialized');
  }

  // Method to show comment and hide it after 3 seconds
  showCommentWithTimeout(comment: string): void {
    this.comment = comment;
    this.showComment = true;

    setTimeout(() => {
      this.showComment = false;
    }, 5000); // Hide after 3 seconds
  }

  displayProfileUpdateDialog(): void {
    this.dialog.open(UpdateProfileDialogComponent);
  }
}