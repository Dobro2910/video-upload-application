import { createReducer, on } from '@ngrx/store';
import * as ShoppingCartActions from './shopping_cart.action';
import { ProductInCart } from '../model/product.model';

// Define the shape of the shopping cart state
export interface ShoppingCartState {
  productsInCart: ProductInCart[];
  comment: string | null;
}

// Initial state of the shopping cart
const initialState: ShoppingCartState = {
    productsInCart: [],
    comment: null
};

// Reducer function using createReducer from @ngrx/store
export const shoppingCartReducer = createReducer(
    initialState,

    // Add product to cart
    on(ShoppingCartActions.addProductAction, (state, { product }) => ({
        ...state,
        comment: null,
        productsInCart: [...state.productsInCart, product], // Always append the new product
    })),

    // Add product to cart success
    on(ShoppingCartActions.addProductActionSuccess, (state, { comment }) => ({
        ...state,
        comment: comment,
    })),

    // Add product to cart failure
    on(ShoppingCartActions.addProductActionFailure, (state, { comment }) => ({
        ...state,
        comment: comment,
    })),

    // Reset shopping cart comment
    on(ShoppingCartActions.resetShoppingCartCommentAction, (state) => ({
        ...state,
        comment: null,
    })),

    // Remove product from cart success
    on(ShoppingCartActions.removeProductAction, (state, { product }) => ({
        ...state,
        comment: null,
        productsInCart: state.productsInCart.filter(p => 
            !(p.productId === product.productId && 
            p.productColor === product.productColor && 
            p.productSize === product.productSize)
        ), // Filter out the removed product
    })),

    on(ShoppingCartActions.increaseProductQuantityAction, (state, { product }) => ({
        ...state, // Spread the existing state to maintain immutability
        productsInCart: state.productsInCart.map(p => 
            (p.productId === product.productId && 
             p.productColor === product.productColor && 
             p.productSize === product.productSize) // Check if all product attributes match
            ? { ...p, productQuantity: p.productQuantity + 1 } // If it matches, update the productQuantity field
            : p // If it doesn't match, return the product unchanged
        )
    })),

    on(ShoppingCartActions.decreaseProductQuantityAction, (state, { product }) => ({
        ...state, // Spread the existing state to maintain immutability
        productsInCart: state.productsInCart.map(p => 
            (p.productId === product.productId && 
             p.productColor === product.productColor && 
             p.productSize === product.productSize) // Check if all product attributes match
            ? { ...p, productQuantity: Math.max(p.productQuantity - 1, 1) } // Ensure productQuantity doesn't go below 1
            : p // If it doesn't match, return the product unchanged
        )
    })),
);

export const shoppingCartReducerFeatureKey = 'shoppingCart';
