import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './authentication.action';
import { UserLoginCredential, User } from '../model/user.model';

// Define the shape of the authentication state
export interface AuthState {
  loggedIn: boolean;
  error: string | null;
}

// Initial state of the authentication feature
const initialState: AuthState = {
  loggedIn: false,
  error: null
};

// Reducer function using createReducer from @ngrx/store
export const authReducer = createReducer(
  initialState,
  on(AuthActions.userLoginSuccess, (state) => ({
    ...state, // Spread operator to create a shallow copy of current state
    loggedIn: true,
    error: null
  })),
  on(AuthActions.userLoginFailure, (state, { error }) => ({
    ...state, // Spread operator to create a shallow copy of current state
    loggedIn: false,
    error: error
  })),
  
//   // Handling the registerNewUser action
//   on(AuthActions.registerNewUserAction, (state, { user }) => ({
//     ...state, // Spread operator to create a shallow copy of current state
//     loggedIn: true, // User is now logged in (assuming successful registration also logs in)
//     error: null // Clear any previous errors
//   }))
);

// export function reducer(state: AuthState | undefined, action: Action) {
//   return authReducer(state, action);
// }

export const authReducerFeatureKey = 'auth';
