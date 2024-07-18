import { Product } from "../model/product.model";
import { createAction, props } from "@ngrx/store"

// all product load actions
export const All_PRODUCT_LOAD ='[auth] begin product load'
export const All_PRODUCT_LOAD_FAILURE ='[auth] product load fail'
export const All_PRODUCT_LOAD_SUCCESS ='[Auth] product load success'
export const getAllProductAction=createAction(All_PRODUCT_LOAD);
export const getAllProductFailure=createAction(All_PRODUCT_LOAD_FAILURE, props<{error: any}>());
export const getAllProductSuccess = createAction(All_PRODUCT_LOAD_SUCCESS, props<{products: Product[]}>());

// user login actions
// export const USER_LOGIN ='[auth] begin login'
// export const USER_LOGIN_FAILURE ='[auth] login fail'
// export const USER_LOGIN_SUCCESS ='[Auth] login success'
// export const userLoginAction=createAction(USER_LOGIN, props<{userlogincredential:UserLoginCredential}>());
// export const userLoginActionFailure=createAction(USER_LOGIN_FAILURE, props<{error: any}>());
// export const userLoginActionSuccess = createAction(USER_LOGIN_SUCCESS);

// user logout actions
// export const USER_LOGOUT ='[auth] begin logout'
// export const USER_LOGOUT_FAILURE ='[auth] logout fail'
// export const USER_LOGOUT_SUCCESS ='[Auth] logout success'
// export const userLogoutAction=createAction(USER_LOGOUT);
// export const userLogoutActionFailure=createAction(USER_LOGOUT_FAILURE, props<{error: any}>());
// export const userLogoutActionSuccess = createAction(USER_LOGOUT_SUCCESS);

// user sign up actions
// export const NEW_USER_REGISTER ='[auth] begin register'
// export const NEW_USER_REGISTER_FAILURE ='[auth] register fail'
// export const NEW_USER_REGISTER_SUCCESS ='[auth] register success'
// export const createUserAction=createAction(NEW_USER_REGISTER, props<{user:User}>());
// export const createUserActionFailure=createAction(NEW_USER_REGISTER_FAILURE, props<{error: any}>());
// export const createUserActionSuccess = createAction(NEW_USER_REGISTER_SUCCESS);
