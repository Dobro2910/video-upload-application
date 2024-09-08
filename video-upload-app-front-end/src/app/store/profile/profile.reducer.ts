import { createReducer, on } from '@ngrx/store';
import * as ProfileActions from './profile.action';
import { User } from '../model/user.model';

// Define the shape of the shopping cart state
export interface ProfileState {
  currentUser: User | null;
  error: string | null;
}

// Initial state of the shopping cart
const initialState: ProfileState = {
    currentUser: null,
    error: null
};

// Reducer function using createReducer from @ngrx/store
export const profileReducer = createReducer(
    initialState,

    on(ProfileActions.getProfileActionFailure, (state, { error }) => ({
        ...state,
        error: error
    })),

    // on(ProfileActions.getProfileActionSuccess, (state, { user }) => ({
    //     ...state,
    //     currentUser: user
    // })),

    on(ProfileActions.getProfileActionSuccess, (state, { user }) => {
        const updatedState = {
            ...state,
            currentUser: user
        };
    
        console.log('Updated Current User:', updatedState.currentUser);  // Log the currentUser after updating state
    
        return updatedState;
    }),

    on(ProfileActions.updateProfileActionFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
);

export const profileReducerFeatureKey = 'profile';
