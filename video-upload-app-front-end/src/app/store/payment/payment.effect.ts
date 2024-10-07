import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of, take } from 'rxjs';
import { PaymentService } from '../../service/payment.service';
import {
  initiatePaymentAction,
  initiatePaymentActionFailure,
  initiatePaymentActionSuccess,
  savePaymentOrderAction,
  savePaymentOrderActionFailure,
  savePaymentOrderActionSuccess
} from './payment.action';

@Injectable()
export class PaymentEffects {
    constructor(
        private actions$: Actions,
        private paymentService: PaymentService,
    ) {}

  // Effect to handle payment initiation
  initiatePayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initiatePaymentAction),
      switchMap(action => {
        return this.paymentService.initiatePayment(action.paymentDetail).pipe(
          map(response => {
            console.log('Payment Initiation Response:', response);
            const clientSecret = response.clientSecret;
            if (clientSecret) {
              console.log('Client Secret Retrieved:', clientSecret);
              return initiatePaymentActionSuccess({ clientSecret });
            } else {
              console.log('Client Secret Not Found');
              return initiatePaymentActionFailure({ error: 'Failed to retrieve clientSecret' });
            }
          }),
          catchError(error => {
            console.error('Payment Initiation Failed:', error);
            return of(initiatePaymentActionFailure({ error: error.message }));
          })
        );
      })
    )
  );


  // Effect to handle saving the payment order
  savePaymentOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(savePaymentOrderAction),
      mergeMap(action =>
        this.paymentService.savePaymentOrder(action.paymentOrder).pipe(
          map(() => {
            console.log('Saving Payment Order Success');
            return savePaymentOrderActionSuccess({ paymentSuccess: 'Payment Success' });
          }),
          catchError(error => {
            console.error('Saving Payment Order Failed:', error);
            return of(savePaymentOrderActionFailure({ error: error.message }));
          })
        )
      )
    )
  );
}