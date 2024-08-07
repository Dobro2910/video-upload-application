import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.action';
import { ProductDisplay } from '../model/product.model';

// Define the shape of the authentication state
export interface ProductState {
  productsDisplay: ProductDisplay[] | null;
  error: string | null;
  filterCheck: boolean;
}

// Initial state of the authentication feature
const initialState: ProductState = {
    productsDisplay: null,
    error: null,
    filterCheck: false
};

// Reducer function using createReducer from @ngrx/store
export const productReducer = createReducer(
  initialState,

  // get pagination product state
  on(ProductActions.getPaginatedProductsFailure, (state, { error }) => ({
    ...state, // Spread operator to create a shallow copy of current state
    error: error,
    productsDisplay: null
  })),

  on(ProductActions.getPaginatedProductsSuccess, (state, { productsDisplay }) => ({
    ...state, // Spread operator to create a shallow copy of current state
    filterCheck: false,
    productsDisplay: productsDisplay
  })),

  // get product by filter state
  on(ProductActions.getPaginatedProductsByFilterActionFailure, (state, { error }) => ({
    ...state, // Spread operator to create a shallow copy of current state
    error: error,
    productsDisplay: null
  })),

  on(ProductActions.getPaginatedProductsByFilterActionSuccess, (state, { productsDisplay }) => ({
    ...state, // Spread operator to create a shallow copy of current state
    filterCheck: true,
    productsDisplay: productsDisplay
  })),

  // // get all product state
  // on(ProductActions.getAllProductFailure, (state, { error }) => ({
  //   ...state, // Spread operator to create a shallow copy of current state
  //   error: error
  // })),

  // on(ProductActions.getAllProductSuccess, (state, { products }) => ({
  //   ...state, // Spread operator to create a shallow copy of current state
  //   products: products
  // })),

  // // get individual product
  // on(ProductActions.getIndividualProductActionFailure, (state, { error }) => ({
  //   ...state, // Spread operator to create a shallow copy of current state
  //   error: error
  // })),

  // on(ProductActions.getIndividualProductActionSuccess, (state, { product }) => ({
  //   ...state, // Spread operator to create a shallow copy of current state
  //   individualProduct: product
  // })),
);

export const productReducerFeatureKey = 'product';
