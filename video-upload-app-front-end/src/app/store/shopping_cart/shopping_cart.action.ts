import { ProductInCart } from "../model/product.model";
import { createAction, props } from "@ngrx/store"

// add new product into cart actions
export const ADD_PRODUCT ='[shopping cart] add product in cart'
// export const ADD_PRODUCT_FAILURE ='[shopping cart] add product in cart fail'
// export const ADD_PRODUCT_SUCCESS ='[shopping cart] add product in cart success'
export const addProductAction=createAction(ADD_PRODUCT, props<{ product: ProductInCart }>());
// export const addProductFailure=createAction(ADD_PRODUCT_FAILURE, props<{error: any}>());
// export const addProductSuccess = createAction(ADD_PRODUCT_SUCCESS, props<{ product: ProductInCart }>());

// remove product from cart actions
export const REMOVE_PRODUCT ='[shopping cart] remove product in cart'
// export const REMOVE_PRODUCT_FAILURE ='[shopping cart] remove product in cart fail'
// export const REMOVE_PRODUCT_SUCCESS ='[shopping cart] remove product in cart success'
export const removeProductAction=createAction(REMOVE_PRODUCT, props<{ product: ProductInCart }>());
// export const removeProductFailure=createAction(REMOVE_PRODUCT_FAILURE, props<{error: any}>());
// export const removeProductSuccess = createAction(REMOVE_PRODUCT_SUCCESS, props<{ product: ProductInCart }>());

// load product by filter actions
// export const LOAD_SHOPPING_CART_PRODUCTS ='[shopping cart] load shopping cart'
// export const LOAD_SHOPPING_CART_PRODUCTS_FAILURE ='[shopping cart] load shopping cart fail'
// export const LOAD_SHOPPING_CART_PRODUCTS_SUCCESS ='[shopping cart] load shopping cart success'
// export const loadShoppingCartProductsAction=createAction(LOAD_SHOPPING_CART_PRODUCTS);
// export const loadShoppingCartProductsActionFailure=createAction(LOAD_SHOPPING_CART_PRODUCTS_FAILURE, props<{error: any}>());
// export const loadShoppingCartProductsActionSuccess = createAction(LOAD_SHOPPING_CART_PRODUCTS_SUCCESS);