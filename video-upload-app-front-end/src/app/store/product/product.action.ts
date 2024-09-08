import { ProductDisplay, Product } from "../model/product.model";
import { createAction, props } from "@ngrx/store";

// get paginated pages load actions
export const GET_PAGINATED_LOAD ='[product] begin paginated load';
export const GET_PAGINATED_LOAD_FAILURE ='[product] paginated load fail';
export const GET_PAGINATED_SUCCESS ='[product] paginated load success';
export const getPaginatedProductsAction = createAction(GET_PAGINATED_LOAD, props<{ page: number }>());
export const getPaginatedProductsFailure = createAction(GET_PAGINATED_LOAD_FAILURE, props<{error: any}>());
export const getPaginatedProductsSuccess = createAction(GET_PAGINATED_SUCCESS, props<{productsDisplay: ProductDisplay[]}>());

// load product by filter actions
export const FILTER_LOAD ='[product] filter load';
export const FILTER_LOAD_FAILURE ='[product] filter load fail';
export const FILTER_LOAD_SUCCESS ='[product] filter load success';
export const getPaginatedProductsByFilterAction = createAction(FILTER_LOAD, props<{ 
    filterPage: number,
    productSize?: string | null,
    productCategory?: string | null,
    productGender?: string | null,
    productBrand?: string | null 
}>());
export const getPaginatedProductsByFilterActionFailure = createAction(FILTER_LOAD_FAILURE, props<{error: any}>());
export const getPaginatedProductsByFilterActionSuccess = createAction(FILTER_LOAD_SUCCESS, props<{productsDisplay: ProductDisplay[]}>());

// create new product actions
export const CREATE_PRODUCT ='[product] create product';
export const CREATE_PRODUCT_FAILURE ='[product] create product fail';
export const CREATE_PRODUCT_SUCCESS ='[product] create product success';
export const createProductAction = createAction(CREATE_PRODUCT, props<{ newProduct: Product }>());
export const createProductActionFailure = createAction(CREATE_PRODUCT_FAILURE, props<{error: any}>());
export const createProductActionSuccess = createAction(CREATE_PRODUCT_SUCCESS);

// get Individual product actions
// export const PRODUCT_LOAD ='[product] product load'
// export const PRODUCT_LOAD_FAILURE ='[product] product load fail'
// export const PRODUCT_LOAD_SUCCESS ='[product] product load success'
// export const getIndividualProductAction=createAction(FILTER_LOAD, props<{ productId: string,}>());
// export const getIndividualProductActionFailure=createAction(FILTER_LOAD_FAILURE, props<{error: any}>());
// export const getIndividualProductActionSuccess = createAction(FILTER_LOAD_SUCCESS, props<{product: Product}>());

// all product load actions
// export const All_PRODUCT_LOAD ='[product] begin product load'
// export const All_PRODUCT_LOAD_FAILURE ='[product] product load fail'
// export const All_PRODUCT_LOAD_SUCCESS ='[product] product load success'
// export const getAllProductAction=createAction(All_PRODUCT_LOAD);
// export const getAllProductFailure=createAction(All_PRODUCT_LOAD_FAILURE, props<{error: any}>());
// export const getAllProductSuccess = createAction(All_PRODUCT_LOAD_SUCCESS, props<{products: Product[]}>());