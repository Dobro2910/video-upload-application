import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { OrderService } from '../../service/order.service';
import * as OrderActions from './order.action';

@Injectable()
export class OrderEffects {
  constructor(
    private actions$: Actions,
    private orderService: OrderService
  ) {}

  getPaginatedOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.getPaginatedOrdersAction),
      mergeMap(action =>
        this.orderService.getPaginatedOrders(action.page, action.sellerEmail).pipe(
          map(response => OrderActions.getPaginatedOrdersSuccess({ orders: response.orders })),
          catchError(error => {
            console.error('get paginated orders failed:', error);
            
            let errorMessage;
            if (error.status === 404) {
              errorMessage = "No Order Available";
            } else {
              errorMessage = "An Error Have Occur When Get Paginated Orders";
            }

            return of(OrderActions.getPaginatedOrdersFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  completeOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.completeOrderAction),
      mergeMap(action =>
        this.orderService.completeOrder(action.orderId, action.productIndex).pipe(
          map(response => OrderActions.completeOrderActionSuccess({ comment: response.message })),
          catchError(error => {
            return of(OrderActions.completeOrderActionFailure({ error: error }));
          })
        )
      )
    )
  );
}