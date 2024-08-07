import { UserLoginCredential, User } from "../model/user.model";
import { createAction, props } from "@ngrx/store"

// reset auth state action
export const RESET_AUTH_ERROR ='[auth] reset auth error'
export const resetAuthError = createAction(RESET_AUTH_ERROR);

// user login actions
export const USER_LOGIN ='[auth] begin login'
export const USER_LOGIN_FAILURE ='[auth] login fail'
export const USER_LOGIN_SUCCESS ='[auth] login success'
export const userLoginAction=createAction(USER_LOGIN, props<{userlogincredential:UserLoginCredential}>());
export const userLoginActionFailure=createAction(USER_LOGIN_FAILURE, props<{error: any}>());
export const userLoginActionSuccess = createAction(USER_LOGIN_SUCCESS);

// user sign up actions
export const NEW_USER_REGISTER ='[auth] begin register'
export const NEW_USER_REGISTER_FAILURE ='[auth] register fail'
export const NEW_USER_REGISTER_SUCCESS ='[auth] register success'
export const createUserAction=createAction(NEW_USER_REGISTER, props<{user:User}>());
export const createUserActionFailure=createAction(NEW_USER_REGISTER_FAILURE, props<{error: any}>());
export const createUserActionSuccess = createAction(NEW_USER_REGISTER_SUCCESS);
