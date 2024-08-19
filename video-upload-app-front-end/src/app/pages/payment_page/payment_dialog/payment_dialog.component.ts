import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { initiatePaymentAction } from '../../../store/payment/payment.action';
import { DialogRef } from '@angular/cdk/dialog';
import { PaymentState } from '../../../store/payment/payment.reducer';
import { Observable } from 'rxjs';
import { take, switchMap, map } from 'rxjs';
import { ShoppingCartState } from '../../../store/shopping_cart/shopping_cart.reducer';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment_dialog.component.html',
  styleUrls: ['./payment_dialog.component.scss'],
})

export class PaymentDialogComponent implements OnInit {
  // observable variable
  errorMessage$: Observable<string | null>;

  // normal variable
  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  card: StripeCardElement | null = null;

  constructor(private store: Store<{ payment: PaymentState, shoppingCart: ShoppingCartState }>, private dialogRef: DialogRef) {
    this.errorMessage$ = this.store.select(state => state.payment.errorMessage);
  }

  async ngOnInit(): Promise<void> {
    this.stripe = await loadStripe('pk_test_51PoJkJP0Ue7wbXrR1N3sPDND86Iki9FK2rnOhYu9zrZXVuYLSxwTM0rVOv9tkQrMIetjIX63pEpIL5E5RKOZg4jE00vre9pt3l');
    if (this.stripe) {
      this.elements = this.stripe.elements();
      this.card = this.elements.create('card');
      this.card.mount('#card-element');
    }
  }

  handleSubmit(): void {
    if (this.stripe && this.card) {
      // Get the paymentDetail and productsInCart from the store
      this.store.select(state => state.payment.paymentDetail).pipe(
        take(1),
        // First get the paymentDetail
        switchMap(paymentDetail => 
          this.store.select(state => state.shoppingCart.productsInCart).pipe(
            take(1),
            map(productsInCart => ({ paymentDetail, productsInCart }))
          )
        )
      ).subscribe(({ paymentDetail, productsInCart }) => {
        if (paymentDetail && this.card) {
          // Log the paymentDetail and productsInCart to the console
          console.log('Payment Detail:', paymentDetail);
          console.log('Products in Cart:', productsInCart);
  
          // Dispatch the initiate payment action with the retrieved paymentDetail and productsInCart
          this.store.dispatch(initiatePaymentAction({ 
            paymentDetail, 
            cardElement: this.card, 
            cardHolderName: "test", // Use the actual cardHolderName from your component
            productsInCart // Pass the current state of productsInCart
          }));
        }
      });
    }
  }

  onClose(): void {
    if (this.dialogRef) {
        this.dialogRef.close();
    }
  }
}
