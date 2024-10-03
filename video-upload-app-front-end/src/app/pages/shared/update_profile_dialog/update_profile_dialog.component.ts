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

    this.onClose();
  }

  // File input must be handle differently, instead of using using Ngmodel, we use this function
  onFileSelected(event: any): void {
    const file: File = event.target.files[0]; // Get the selected file
    if (file) {
      this.updateUser.userImage = file;  // Assign the selected file to updateUser
    }
  }

  onClose(): void {
    if (this.dialogRef) {
        this.dialogRef.close();
    }
  }
}
