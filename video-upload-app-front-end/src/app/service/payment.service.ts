import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentDetail } from '../store/model/payment.model';
import { ProductInCart } from '../store/model/product.model';

import { HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient, private authService: AuthenticationService) {}

  initiatePayment(paymentDetail: PaymentDetail): Observable<any> {
    return this.http.post('http://localhost:3000/create-payment-intent', paymentDetail);
  }

  savePaymentOrder(productsInCart: ProductInCart[]): Observable<any> {
    const token = this.authService.getToken(); // Adjust this if you store the token elsewhere

    // Create the headers object and include the Authorization header with the JWT token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // return this.http.post('http://localhost:3000/payment/saveorder', productsInCart);
    return this.http.post('http://localhost:3000/payment/saveorder', productsInCart, { headers });
  }
}
