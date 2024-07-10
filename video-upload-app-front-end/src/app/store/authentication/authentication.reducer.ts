import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './authentication.action';

// Define the shape of the authentication state
export interface AuthState {
  error: string | null;
}

// Initial state of the authentication feature
const initialState: AuthState = {
  error: null
};

// Reducer function using createReducer from @ngrx/store
export const authReducer = createReducer(
  initialState,

  on(AuthActions.userLoginActionFailure, (state, { error }) => ({
    ...state, // Spread operator to create a shallow copy of current state
    error: error
  })),

  // on(AuthActions.userLoginActionSuccess, (state) => ({
  //   ...state, // Spread operator to create a shallow copy of current state
  //   isAuthenticated: true,
  //   error: null,
  // })),

  on(AuthActions.createUserActionFailure, (state, { error }) => ({
    ...state, // Spread operator to create a shallow copy of current state
    error: error
  })),

  // on(AuthActions.createUserActionSuccess, (state) => ({
  //   ...state, // Spread operator to create a shallow copy of current state
  //   isAuthenticated: false,
  //   error: null,
  // }))
);

export const authReducerFeatureKey = 'auth';
