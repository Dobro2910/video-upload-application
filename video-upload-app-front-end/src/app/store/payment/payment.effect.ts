import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { PaymentService } from '../../service/payment.service';
import {
  initiatePaymentAction,
  confirmPaymentAction,
  initiatePaymentActionFailure,
  initiatePaymentActionSuccess,
  savePaymentOrderAction
} from './payment.action';
import { loadStripe } from '@stripe/stripe-js';

@Injectable()
export class PaymentEffects {
    constructor(
        private actions$: Actions,
        private paymentService: PaymentService,
    ) {}

    // initialize a payment intent, send the payment detail to the backend to generate a clientSecret key, 
    // then send the secret key, credit card value and card holder name suing a confirmation payment action
    initiatePayment$ = createEffect(() =>
        this.actions$.pipe(
            ofType(initiatePaymentAction),
            mergeMap(action =>
                this.paymentService.initiatePayment(action.paymentDetail).pipe(
                    mergeMap(async response => {
                        const clientSecret = response.clientSecret;

                        if (clientSecret) {
                            // Dispatch the confirmPaymentAction directly after obtaining the clientSecret
                            return confirmPaymentAction({
                                clientSecret,
                                cardElement: action.cardElement,
                                cardHolderName: action.cardHolderName,
                                productsInCart: action.productsInCart
                            });
                        } else {
                            throw new Error('Failed to retrieve clientSecret');
                        }
                    }),
                    catchError(error => of(initiatePaymentActionFailure({ error: error.message })))
                )
            )
        )
    );

    // Effect to use stripe library to create a payment using the user credit 
    // card then return a payment id to keep track of the payment. It then call
    // the paymentOrder save method to save the order into the database that the user just bought
    confirmPayment$ = createEffect(() =>
        this.actions$.pipe(
            ofType(confirmPaymentAction),
            mergeMap(async action => {
                const stripe = await loadStripe('pk_test_51PoJkJP0Ue7wbXrR1N3sPDND86Iki9FK2rnOhYu9zrZXVuYLSxwTM0rVOv9tkQrMIetjIX63pEpIL5E5RKOZg4jE00vre9pt3l'); // Replace with your Stripe publishable key
                
                if (stripe) {
                    const { error, paymentIntent } = await stripe.confirmCardPayment(action.clientSecret, {
                        payment_method: {
                                card: action.cardElement, // Pass the StripeCardElements
                                billing_details: {
                                name: action.cardHolderName,
                            },
                        },
                    });

                    if (error) {
                        throw new Error(error.message);
                    }

                    if (paymentIntent && paymentIntent.status === 'succeeded') {
                        console.log("wtf man");
                        return savePaymentOrderAction({
                            paymentIntentId: paymentIntent.id,
                            productsInCart: action.productsInCart
                        });
                    } else {
                        throw new Error('Payment failed');
                    }
                } else {
                    throw new Error('Stripe could not be loaded');
                }
            }),
            catchError(error => of(initiatePaymentActionFailure({ error: error.message })))
        )
    );

    // effect to save the payment order into the database after payment is completed
    // savePaymentOrder$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(savePaymentOrderAction),
    //         mergeMap(action =>
    //             this.paymentService.savePaymentOrder(action.productsInCart).pipe(
    //                 map(() => initiatePaymentActionSuccess({paymentIntentId: action.paymentIntentId})),
    //                 catchError(error => {
    //                     console.error('Save Payment Order failed:', error);
    //                     let errorMessage = "An Error Have Occur When Save Payment Order";
    //                     return of(initiatePaymentActionFailure({ error: errorMessage }));
    //                 })  
    //             )
    //         )
    //     )
    // );

    // Effect to save the payment order into the database after payment is completed
    savePaymentOrder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(savePaymentOrderAction),
            mergeMap(action => {
                console.log('SavePaymentOrderAction dispatched:', action); // Log the action

                return this.paymentService.savePaymentOrder(action.productsInCart).pipe(
                    map(response => {
                        console.log('SavePaymentOrder response:', response); // Log the response
                        return initiatePaymentActionSuccess({ paymentIntentId: action.paymentIntentId });
                    }),
                    catchError(error => {
                        console.error('Save Payment Order failed:', error); // Log the error
                        let errorMessage = "An Error Occurred When Saving Payment Order";
                        return of(initiatePaymentActionFailure({ error: errorMessage }));
                    })  
                );
            })
        )
    );
}




