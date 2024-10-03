import { User, UpdateUser } from "../model/user.model";
import { createAction, props } from "@ngrx/store";

export const GET_PROFILE_ACTION = '[profile] get profile';
export const getProfileAction = createAction(GET_PROFILE_ACTION, props<{ userEmail: string }>());

export const GET_PROFILE_ACTION_FAILURE = '[profile] get profile fail';
export const getProfileActionFailure = createAction(GET_PROFILE_ACTION_FAILURE, props<{ error: any }>());

export const GET_PROFILE_ACTION_SUCCESS = '[profile] get profile success';
export const getProfileActionSuccess = createAction(GET_PROFILE_ACTION_SUCCESS, props<{ user: User }>());

export const UPDATE_PROFILE_ACTION = '[profile] update profile';
export const updateProfileAction = createAction(UPDATE_PROFILE_ACTION, props<{ updateUser: UpdateUser, userEmail: string }>());

export const UPDATE_PROFILE_ACTION_FAILURE = '[profile] update profile fail';
export const updateProfileActionFailure = createAction(UPDATE_PROFILE_ACTION_FAILURE, props<{ error: any }>());

export const UPDATE_PROFILE_ACTION_SUCCESS = '[profile] update profile success';
export const updateProfileActionSuccess = createAction(UPDATE_PROFILE_ACTION_SUCCESS, props<{ comment: string }>());