import { UserLoginCredential, User } from "../model/user.model";
import { createAction, props } from "@ngrx/store"

export const NEW_USER_REGISTER ='[auth] begin register'
export const USER_LOGIN ='[auth] begin login'

export const userLogin=createAction(USER_LOGIN, props<{userlogincredential:UserLoginCredential}>());
export const registerNewUse=createAction(NEW_USER_REGISTER, props<{user:User}>);
