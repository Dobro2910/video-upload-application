import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentDetail } from '../store/model/payment.model';
import { ProductInCart } from '../store/model/product.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  initiatePayment(paymentDetail: PaymentDetail): Observable<any> {
    return this.http.post('http://localhost:3000/create-payment-intent', paymentDetail);
  }

  savePaymentOrder(productsInCart: ProductInCart[]): Observable<any> {
    return this.http.post('http://localhost:3000/payment/saveorder', productsInCart);
  }
}
