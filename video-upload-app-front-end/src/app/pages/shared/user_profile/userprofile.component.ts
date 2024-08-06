import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-profile-cart',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss'],
})
export class UserProfileComponent implements OnInit {
    constructor() { }

    ngOnInit(): void {
      console.log('User profile component initialized');
    }
}
