import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller_profile.component.html',
  styleUrls: ['./seller_profile.component.scss'],
})
export class SellerProfileComponent implements OnInit {
    constructor(private router: Router) { }

    ngOnInit(): void {
        console.log('Seller profile component initialized');
    }
}