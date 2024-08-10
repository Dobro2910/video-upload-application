import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user_profile.component.html',
  styleUrls: ['./user_profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
    constructor(private router: Router) { }

    ngOnInit(): void {
        console.log('Profile component initialized');
    }
}