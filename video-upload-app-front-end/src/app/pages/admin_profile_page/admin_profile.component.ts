import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin_profile.component.html',
  styleUrls: ['./admin_profile.component.scss'],
})
export class AdminProfileComponent implements OnInit {
    constructor(private router: Router) { }

    ngOnInit(): void {
        console.log('Admin profile component initialized');
    }
}