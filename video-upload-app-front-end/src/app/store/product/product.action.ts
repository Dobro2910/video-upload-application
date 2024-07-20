import { Product } from "../model/product.model";
import { createAction, props } from "@ngrx/store"

// all product load actions
export const All_PRODUCT_LOAD ='[product] begin product load'
export const All_PRODUCT_LOAD_FAILURE ='[product] product load fail'
export const All_PRODUCT_LOAD_SUCCESS ='[product] product load success'
export const getAllProductAction=createAction(All_PRODUCT_LOAD);
export const getAllProductFailure=createAction(All_PRODUCT_LOAD_FAILURE, props<{error: any}>());
export const getAllProductSuccess = createAction(All_PRODUCT_LOAD_SUCCESS, props<{products: Product[]}>());

// get paginated pages load actions
export const GET_PAGINATED_LOAD ='[product] begin paginated load'
export const GET_PAGINATED_LOAD_FAILURE ='[product] paginated load fail'
export const GET_PAGINATED_SUCCESS ='[product] paginated load success'
export const getPaginatedProductAction=createAction(GET_PAGINATED_LOAD, props<{ page: number }>());
export const getPaginatedProductFailure=createAction(GET_PAGINATED_LOAD_FAILURE, props<{error: any}>());
export const getPaginatedProductSuccess = createAction(GET_PAGINATED_SUCCESS, props<{products: Product[]}>());

// load product by filter actions
export const FILTER_LOAD ='[product] filter load'
export const FILTER_LOAD_FAILURE ='[product] filter load fail'
export const FILTER_LOAD_SUCCESS ='[product] filter load success'
export const getFilterProductAction=createAction(FILTER_LOAD, props<{ 
    // productPrice: number | undefined,
    productSize?: string | null,
    productCategory?: string | null,
    productGender?: string | null,
    productBrand?: string | null 
}>());
export const getFilterProductActionFailure=createAction(FILTER_LOAD_FAILURE, props<{error: any}>());
export const getFilterProductActionSuccess = createAction(FILTER_LOAD_SUCCESS, props<{products: Product[]}>());
