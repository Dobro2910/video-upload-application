import { UserLoginCredential, User } from "../model/user.model";
import { createAction, props } from "@ngrx/store"

export const USER_LOGIN ='[auth] begin login'
export const USER_SUCCESS ='[auth] login success'
export const USER_FAILURE ='[auth] begin fail'
export const NEW_USER_REGISTER ='[auth] begin register'

export const userLoginAction=createAction(USER_LOGIN, props<{userlogincredential:UserLoginCredential}>());
export const userLoginSuccess=createAction(USER_SUCCESS, props<{token: string}>());
export const userLoginFailure=createAction(USER_FAILURE, props<{error: any}>());
export const registerNewUserAction=createAction(NEW_USER_REGISTER, props<{user:User}>());
