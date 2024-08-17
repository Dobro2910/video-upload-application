import { createReducer, on } from '@ngrx/store';
import * as ShoppingCartActions from './shopping_cart.action';
import { ProductInCart } from '../model/product.model';

// Define the shape of the shopping cart state
export interface ShoppingCartState {
  productsInCart: ProductInCart[];
  error: string | null;
}

// Initial state of the shopping cart
const initialState: ShoppingCartState = {
    productsInCart: [],
    error: null
};

// Reducer function using createReducer from @ngrx/store
export const shoppingCartReducer = createReducer(
    initialState,

    // Add product to cart success
    on(ShoppingCartActions.addProductAction, (state, { product }) => ({
        ...state,
        error: null,
        productsInCart: [...state.productsInCart, product], // Always append the new product
    })),

    // Remove product from cart success
    on(ShoppingCartActions.removeProductAction, (state, { product }) => ({
        ...state,
        error: null,
        productsInCart: state.productsInCart.filter(p => 
            !(p.productId === product.productId && 
            p.productColor === product.productColor && 
            p.productSize === product.productSize)
        ), // Filter out the removed product
    })),

    // // Remove product from cart success
    // on(ShoppingCartActions.removeProductAction, (state, { product }) => ({
    //     ...state,
    //     error: null,
    //     productsInCart: state.productsInCart.filter(p => p.productId === product.productId && p.productColor === product.productColor && p.productSize === product.productSize), // Filter out the removed product
    // })),
);

//   // Add product to cart failure
//   on(ShoppingCartActions.addProductFailure, (state, { error }) => ({
//     ...state, // Spread operator to create a shallow copy of current state
//     error: error,
//   })),

//   // Add product to cart success
//   on(ShoppingCartActions.addProductSuccess, (state, { product }) => ({
//     ...state, // Spread operator to create a shallow copy of current state
//     error: null,
//     productsInCart: state.productsInCart
//       ? [...state.productsInCart, product]
//       : [product], // Handle null case by creating a new array
//   })),

//   // Remove product from cart failure
//   on(ShoppingCartActions.removeProductFailure, (state, { error }) => ({
//     ...state, // Spread operator to create a shallow copy of current state
//     error: error,
//   })),

//   // Remove product from cart success
//   on(ShoppingCartActions.removeProductSuccess, (state, { product }) => ({
//     ...state, // Spread operator to create a shallow copy of current state
//     error: null,
//     productsInCart: state.productsInCart
//       ? state.productsInCart.filter(p => p.productId !== product.productId) // Remove the product by filtering it out
//       : null, // If no products in the cart, remain null
//   })),

//   on(ShoppingCartActions.loadShoppingCartProductsActionSuccess, (state, { productsDisplay }) => ({
//     ...state, // Spread operator to create a shallow copy of current state
//     filterCheck: true,
//     productsDisplay: productsDisplay
//   })),

export const shoppingCartReducerFeatureKey = 'shoppingCart';
