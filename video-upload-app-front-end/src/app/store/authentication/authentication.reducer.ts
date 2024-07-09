import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './authentication.action';

// Define the shape of the authentication state
export interface AuthState {
  error: string | null;
  isAuthenticated: boolean;
}

// Initial state of the authentication feature
const initialState: AuthState = {
  isAuthenticated: false,
  error: null
};

// Reducer function using createReducer from @ngrx/store
export const authReducer = createReducer(
  initialState,

  on(AuthActions.userLoginActionFailure, (state, { error }) => ({
    ...state, // Spread operator to create a shallow copy of current state
    isAuthenticated: false,
    error: error
  })),

  on(AuthActions.userLoginActionSuccess, (state, action) => ({
    ...state, // Spread operator to create a shallow copy of current state
    isAuthenticated: true,
    error: null,
  })),

  on(AuthActions.createUserActionFailure, (state, { error }) => ({
    ...state, // Spread operator to create a shallow copy of current state
    isAuthenticated: false,
    error: error
  })),

  on(AuthActions.createUserActionSuccess, (state, action) => ({
    ...state, // Spread operator to create a shallow copy of current state
    isAuthenticated: false,
    error: null,
  }))
);

export const authReducerFeatureKey = 'auth';
