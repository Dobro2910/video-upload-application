import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProductService } from '../../service/product.service';
import * as ProductActions from '../product/product.action';

import { Router } from '@angular/router';

@Injectable()
export class ProductEffects {

  getAllProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getAllProductAction), // Listen for user login action
      mergeMap(action =>
        this.productService.getAllProduct().pipe(
          map(response => ProductActions.getAllProductSuccess({ products: response.products })),
          catchError(error => {
            // Handle login failure, return error message
            console.error('get all products failed:', error);

            let errorMessage;
            if (error.status === 404) {
              errorMessage = "No Product Available";
            } else {
              errorMessage = "An Error Have Occur When Get All Products";
            }

            return of(ProductActions.getAllProductFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

//   createUser$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.createUserAction),
//         mergeMap(action =>
//           this.authService.UserRegister(action.user).pipe(
//             tap(() => {
//               this.router.navigate(['/login']); // Navigate to home on success
//               // return AuthActions.createUserActionSuccess({ message: response.message });
//             }),
//             map(() => AuthActions.createUserActionSuccess()),
//             catchError(error => {
//               console.error('Register failed:', error);

//               let errorMessage;
//               if (error.status === 401) {
//                 errorMessage = "Email Already Exist";
//               } else {
//                 errorMessage = "An Error Have Occur When Register";
//               }
//               return of(AuthActions.createUserActionFailure({ error: errorMessage }));
//             })  
//         )
//       )
//     )
//   );

  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private router: Router
  ) {}

  // Add other effects if needed, such as registration, logout, etc.
}
