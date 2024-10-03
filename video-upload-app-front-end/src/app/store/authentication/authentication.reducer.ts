import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './authentication.action';

// Define the shape of the authentication state
export interface AuthState {
  comment: string | null;
}

// Initial state of the authentication feature
const initialState: AuthState = {
  comment: null
};

// Reducer function using createReducer from @ngrx/store
export const authReducer = createReducer(
  initialState,

  on(AuthActions.userLoginActionFailure, (state, { error }) => ({
    ...state, // Spread operator to create a shallow copy of current state
    comment: error
  })),

  on(AuthActions.createUserActionFailure, (state, { error }) => ({
    ...state, // Spread operator to create a shallow copy of current state
    comment: error
  })),

  on(AuthActions.createUserActionSuccess, (state, { comment }) => ({
    ...state, // Spread operator to create a shallow copy of current state
    comment: comment
  })),

  on(AuthActions.createUserWithRoleActionFailure, (state, { error }) => ({
    ...state, // Spread operator to create a shallow copy of current state
    comment: error
  })),

  on(AuthActions.createUserWithRoleActionSuccess, (state, { comment }) => ({
    ...state, // Spread operator to create a shallow copy of current state
    comment: comment
  })),

  on(AuthActions.resetAuthError, (state) => ({
    ...state,
    error: null
  })),
);

export const authReducerFeatureKey = 'auth';
