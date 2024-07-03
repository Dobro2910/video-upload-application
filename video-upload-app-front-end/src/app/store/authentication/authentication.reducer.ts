import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './authentication.action';
import { UserLoginCredential, User } from '../model/user.model';

// Define the shape of the authentication state
export interface AuthState {
  loggedIn: boolean; // Indicates if the user is logged in
  error: string | null; // Stores any authentication-related error message or null if no error
}

// Initial state of the authentication feature
const initialState: AuthState = {
  loggedIn: false, // Initial state: user is not logged in
  error: null // Initial state: no errors
};

// Reducer function using createReducer from @ngrx/store
export const authReducer = createReducer(
  initialState, // Initial state defined above
  // Handling the userLogin action
  on(AuthActions.userLoginSuccess, (state) => ({
    ...state, // Spread operator to create a shallow copy of current state
    loggedIn: true, // User is now logged in
    error: null // Clear any previous errors
  })),
  on(AuthActions.userLoginFailure, (state, { error }) => ({
    ...state, // Spread operator to create a shallow copy of current state
    loggedIn: false, // User is now logged in
    error: error // Clear any previous errors
  })),
  
//   // Handling the registerNewUser action
//   on(AuthActions.registerNewUserAction, (state, { user }) => ({
//     ...state, // Spread operator to create a shallow copy of current state
//     loggedIn: true, // User is now logged in (assuming successful registration also logs in)
//     error: null // Clear any previous errors
//   }))
);
