import { Component, OnInit } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { UpdateUser } from '../../../store/model/user.model';
import { AuthenticationService } from '../../../service/authentication.service';

import { Store } from '@ngrx/store';
import * as ProfileActions from '../../../store/profile/profile.action';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update_profile_dialog.component.html',
  styleUrls: ['./update_profile_dialog.component.scss'],
})
export class UpdateProfileDialogComponent implements OnInit {
  updateUser: UpdateUser;

  constructor(private dialogRef: DialogRef, private store: Store, private authService: AuthenticationService) { 
    this.updateUser = {
      userEmail: undefined,
      userName: undefined,
      userImage: undefined
    }
  }

  ngOnInit(): void {
    console.log('Update profile dialog component initialized');
  }

  updateProfile(): void {
    const userEmail = this.authService.getUserEmailFromToken();

    if (userEmail) {
      this.store.dispatch(ProfileActions.updateProfileAction({updateUser: this.updateUser, userEmail: userEmail}));
    } else {
      this.store.dispatch(ProfileActions.updateProfileActionFailure({error: "Cannot find current session token"}));
    }
  }

  onClose(): void {
    if (this.dialogRef) {
        this.dialogRef.close();
    }
  }
}
