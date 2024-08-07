import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss'],
})
export class UserProfileComponent implements OnInit {
    constructor(private router: Router, private authService: AuthenticationService,) { }

    token: string | null = null;

    ngOnInit(): void {
      console.log('User profile component initialized');
    }

    goToProfilePage(): void {
      this.token = this.authService.getToken()
      if (this.token) {
        this.router.navigate(['/profile']);
      } else {
        this.router.navigate(['/login']);
      }
    }
}
