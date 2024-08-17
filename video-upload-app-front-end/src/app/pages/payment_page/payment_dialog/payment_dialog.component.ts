import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment_dialog.component.html',
  styleUrls: ['./payment_dialog.component.scss'],
})
export class PaymentDialogComponent implements OnInit {
    constructor(private router: Router) { }

    ngOnInit(): void {
        console.log('payment dialog component initialized');
    }
}