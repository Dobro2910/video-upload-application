import { Component, OnInit } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { UpdateUser } from '../../../store/model/user.model';

import { Store } from '@ngrx/store';
import * as ProfileActions from '../../../store/profile/profile.action';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update_profile_dialog.component.html',
  styleUrls: ['./update_profile_dialog.component.scss'],
})
export class UpdateProfileDialogComponent implements OnInit {
  updateUser: UpdateUser;

  constructor(private dialogRef: DialogRef, private store: Store) { 
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
    this.store.dispatch(ProfileActions.updateProfileAction({updateUser: this.updateUser}));
  }

  onClose(): void {
    if (this.dialogRef) {
        this.dialogRef.close();
    }
  }
}
