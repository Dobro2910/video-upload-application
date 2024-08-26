import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of, Observable, from } from 'rxjs';
import { PaymentService } from '../../service/payment.service';
import {
  initiatePaymentAction,
  initiatePaymentActionFailure,
  initiatePaymentActionSuccess,
  savePaymentOrderAction,
  savePaymentOrderActionFailure,
  savePaymentOrderActionSuccess
} from './payment.action';
import { Action } from '@ngrx/store';

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
        console.log('Initiate Payment Action:', action);
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
  // savePaymentOrder$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(savePaymentOrderAction),
  //     mergeMap(action => {
  //       console.log("wtf");
  //       console.log('Save Payment Order Action:', action);
  //       return this.paymentService.savePaymentOrder(action.productsInCart).pipe(
  //         map(() => {
  //           console.log('Payment Order Saved Successfully');
  //           return savePaymentOrderActionSuccess();
  //         }),
  //         catchError(error => {
  //           console.error('Saving Payment Order Failed:', error);
  //           return of(savePaymentOrderActionFailure({ error: error.message }));
  //         })
  //       );
  //     })
  //   )
  // );

  savePaymentOrder$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(savePaymentOrderAction),
      tap(action => console.log('Save Payment Order Action Triggered:', action)),
      mergeMap(action => {
        return this.paymentService.savePaymentOrder(action.productsInCart).pipe(
          map(() => {
            console.log('Payment Order Saved Successfully');
            return savePaymentOrderActionSuccess();
          }),
          catchError(error => {
            console.error('Saving Payment Order Failed:', error);
            return of(savePaymentOrderActionFailure({ error: error.message }));
          })
        );
      })
    )
  );
}