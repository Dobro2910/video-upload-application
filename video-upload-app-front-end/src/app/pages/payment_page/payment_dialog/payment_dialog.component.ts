import { Component, OnInit, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { initiatePaymentAction, savePaymentOrderAction } from '../../../store/payment/payment.action';
import { DialogRef } from '@angular/cdk/dialog';
import { PaymentState } from '../../../store/payment/payment.reducer';
import { Observable } from 'rxjs';
import { take, firstValueFrom, filter } from 'rxjs';
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

  constructor(private store: Store<{ payment: PaymentState, shoppingCart: ShoppingCartState }>, private dialogRef: DialogRef, private ngZone: NgZone) {
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

    async handleSubmit(): Promise<void> {
        if (this.stripe && this.card) {
            try {
                // Step 1: Get paymentDetail and productsInCart from the store
                const paymentDetail = await firstValueFrom(this.store.select(state => state.payment.paymentDetail).pipe(take(1)));

                if (paymentDetail) {
                    // Step 2: Convert the payment amount from dollars to cents
                    const convertedPaymentDetail = {
                        ...paymentDetail,
                        amount: paymentDetail.amount * 100 // Convert from dollars to cents
                    };

                    // Step 3: Dispatch the action to initiate the payment
                    this.store.dispatch(initiatePaymentAction({ paymentDetail: convertedPaymentDetail }));
                }
                
                // Step 4: Select the clientSecret from the store
                const clientSecret = await firstValueFrom(
                    this.store.select(state => state.payment.clientSecret).pipe(
                        filter(secret => !!secret),  // Wait until clientSecret is not null or undefined
                        take(1)  // Take the first emitted value that meets the filter condition
                    )
                );

                if (clientSecret) {
                    // Step 5: Confirm the payment using Stripe
                    const { error, paymentIntent } = await this.stripe.confirmCardPayment(clientSecret, {
                        payment_method: {
                            card: this.card,
                            billing_details: {
                                name: 'test',
                            },
                        },
                    });

                    if (error) {
                        console.log("Error during payment process: ", error);
                    } else if (paymentIntent?.id && paymentIntent.status === 'succeeded') {
                        const productsInCart = await firstValueFrom(this.store.select(state => state.shoppingCart.productsInCart).pipe(take(1)));
                        console.log('Dispatching savePaymentOrderAction:', productsInCart);

                        // Step 6: Save product order into the database
                        this.store.dispatch(savePaymentOrderAction({ productsInCart: productsInCart }));
                    } 
                } 
            } catch (error) {
                console.error("Error during payment process:", error);
            }
        }

        this.onClose();
    }

  onClose(): void {
    if (this.dialogRef) {
        this.dialogRef.close();
    }
  }
}
