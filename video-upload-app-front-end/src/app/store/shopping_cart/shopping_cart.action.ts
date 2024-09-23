import { ProductInCart } from "../model/product.model";
import { createAction, props } from "@ngrx/store";

// add new product into cart actions
export const ADD_PRODUCT ='[shopping cart] add product in cart';
export const addProductAction = createAction(ADD_PRODUCT, props<{ product: ProductInCart }>());

export const ADD_PRODUCT_SUCCESS ='[shopping cart] add product in cart success';
export const addProductActionSuccess = createAction(ADD_PRODUCT_SUCCESS, props<{ comment: string }>());

export const ADD_PRODUCT_FAILURE ='[shopping cart] add product in cart failure';
export const addProductActionFailure = createAction(ADD_PRODUCT_FAILURE, props<{ comment: string }>());

export const RESET_SHOPPING_CART_COMMENT ='[shopping cart] reset shopping cart comment';
export const resetShoppingCartCommentAction = createAction(RESET_SHOPPING_CART_COMMENT);

// remove product from cart actions
export const REMOVE_PRODUCT ='[shopping cart] remove product in cart';
export const removeProductAction = createAction(REMOVE_PRODUCT, props<{ product: ProductInCart }>());

// update buying quantity
export const INCREASE_PRODUCT_QUANTITY ='[shopping cart] increase product quantity in cart';
export const increaseProductQuantityAction = createAction(INCREASE_PRODUCT_QUANTITY, props<{ product: ProductInCart }>());

export const DECREASE_PRODUCT_QUANTITY ='[shopping cart] decrease product quantity in cart';
export const decreaseProductQuantityAction = createAction(DECREASE_PRODUCT_QUANTITY, props<{ product: ProductInCart }>());


