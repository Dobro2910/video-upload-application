import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.action';
import { Product } from '../model/product.model';

// Define the shape of the authentication state
export interface ProductState {
  products: Product[] | null;
  individualProduct: Product | null;
  error: string | null;
  filterCheck: boolean;
}

// Initial state of the authentication feature
const initialState: ProductState = {
    products: null,
    individualProduct: null,
    error: null,
    filterCheck: false
};

// Reducer function using createReducer from @ngrx/store
export const productReducer = createReducer(
  initialState,

  // get all product state
  on(ProductActions.getAllProductFailure, (state, { error }) => ({
    ...state, // Spread operator to create a shallow copy of current state
    error: error
  })),

  on(ProductActions.getAllProductSuccess, (state, { products }) => ({
    ...state, // Spread operator to create a shallow copy of current state
    products: products
  })),

  // get pagination product state
  on(ProductActions.getPaginatedProductFailure, (state, { error }) => ({
    ...state, // Spread operator to create a shallow copy of current state
    error: error
  })),

  on(ProductActions.getPaginatedProductSuccess, (state, { products }) => ({
    ...state, // Spread operator to create a shallow copy of current state
    filterCheck: false,
    products: products
  })),

  // get product by filter state
  on(ProductActions.getFilterProductActionFailure, (state, { error }) => ({
    ...state, // Spread operator to create a shallow copy of current state
    error: error
  })),

  on(ProductActions.getFilterProductActionSuccess, (state, { products }) => ({
    ...state, // Spread operator to create a shallow copy of current state
    filterCheck: true,
    products: products
  })),

  // get individual product
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
