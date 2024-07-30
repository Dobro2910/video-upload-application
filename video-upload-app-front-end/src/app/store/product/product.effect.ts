import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProductService } from '../../service/product.service';
import * as ProductActions from '../product/product.action';

@Injectable()
export class ProductEffects {

  getAllProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getAllProductAction),
      mergeMap(action =>
        this.productService.getAllProduct().pipe(
          tap((response: any) => {
            console.log(response.products);
          }),
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

  getPaginatedProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getPaginatedProductAction),
      mergeMap(action =>
        this.productService.getPaginatedProduct(action.page).pipe(
          tap((response: any) => {
            console.log(response.products);
          }),
          map(response => ProductActions.getPaginatedProductSuccess({ products: response.products })),
          catchError(error => {
            // Handle login failure, return error message
            console.error('get paginated products failed:', error);
            
            let errorMessage;
            if (error.status === 404) {
              errorMessage = "No Product Available";
            } else {
              errorMessage = "An Error Have Occur When Get Paginated Products";
            }

            return of(ProductActions.getPaginatedProductFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  getFilterProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getFilterProductAction),
      mergeMap(action =>
        this.productService.findProductByFilter({
          filterPage: action.filterPage,
          // productPrice: action.productPrice,
          productBrand: action.productBrand,
          productCategory: action.productCategory,
          productGender: action.productGender,
          productSize: action.productSize
        }).pipe(
          tap((response: any) => {
            console.log(response.products);
          }),
          map(response => ProductActions.getFilterProductActionSuccess({ products: response.products })),
          catchError(error => {
            // Handle login failure, return error message
            console.error('get products by filter failed:', error);
            
            let errorMessage;
            if (error.status === 404) {
              errorMessage = "No Product Available";
            } else {
              errorMessage = "An Error Have Occur When Get Products By Filter";
            }

            return of(ProductActions.getFilterProductActionFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  // Add other effects if needed, such as registration, logout, etc.
}
