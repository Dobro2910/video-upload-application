// cart.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of } from 'rxjs';
import * as ShoppingCartActions from '../shopping_cart/shopping_cart.action';

@Injectable()
export class ShoppingCartEffects {
  constructor(private actions$: Actions) {}

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingCartActions.addProductAction),
      // Simulate a service call or any async operation (optional)
      map(action => {
        console.log("hello");
        // Here, you could have some logic to verify if the product addition was successful
        return ShoppingCartActions.addProductActionSuccess({ comment: 'Add Product To Cart Success' });
      }),
      catchError(error => of(ShoppingCartActions.addProductActionFailure({ comment: 'Add Product To Cart Fail' })))
    )
  );
}