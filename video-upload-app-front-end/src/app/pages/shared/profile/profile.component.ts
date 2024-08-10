import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    constructor(private router: Router, private authService: AuthenticationService,) { }

    token: string | null = null;

    ngOnInit(): void {
      console.log('Profile component initialized');
    }

    goToProfilePage(): void {
      this.router.navigate(['/profile']);
    }
}
