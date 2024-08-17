import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../service/authentication.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserRole } from '../../../store/model/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private router: Router, private authService: AuthenticationService) { }

  token: string | null = null;

  ngOnInit(): void {
    console.log('Profile component initialized');
  }

  goToProfilePage(): void {
    const jwtHelper = new JwtHelperService(); // Create an instance of JwtHelperService to manage JWT tokens
    const token = this.authService.getToken(); // Retrieve the JWT token from local storage

    if (token && !jwtHelper.isTokenExpired(token)) {
      const decodedToken = jwtHelper.decodeToken(token);
      const userRole = decodedToken.role as UserRole;

      if (userRole == UserRole.User) {
        this.router.navigate(['/userprofile']);
      } else if (userRole == UserRole.Seller) {
        this.router.navigate(['/sellerprofile']);
      } else if (userRole == UserRole.Admin) {
        this.router.navigate(['/adminprofile']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
