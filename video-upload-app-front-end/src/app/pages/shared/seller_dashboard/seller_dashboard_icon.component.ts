import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../service/authentication.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-seller-dashboard-icon',
  templateUrl: './seller_dashboard_icon.component.html',
  styleUrls: ['./seller_dashboard_icon.component.scss'],
})
export class SellerDashboardIconComponent implements OnInit {
  constructor(private router: Router, private authService: AuthenticationService) { }

  token: string | null = null;

  ngOnInit(): void {
    console.log('Dashboard icon component initialized');
  }

  goToDashboardPage(): void {
    const jwtHelper = new JwtHelperService(); // Create an instance of JwtHelperService to manage JWT tokens
    const token = this.authService.getToken(); // Retrieve the JWT token from local storage

    if (token && !jwtHelper.isTokenExpired(token)) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
