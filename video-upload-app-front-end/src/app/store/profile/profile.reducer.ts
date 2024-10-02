import { createReducer, on } from '@ngrx/store';
import * as ProfileActions from './profile.action';
import { User } from '../model/user.model';

// Define the shape of the shopping cart state
export interface ProfileState {
  currentUser: User | null;
  comment: string | null;
}

// Initial state of the shopping cart
const initialState: ProfileState = {
    currentUser: null,
    comment: null
};

// Reducer function using createReducer from @ngrx/store
export const profileReducer = createReducer(
    initialState,

    on(ProfileActions.getProfileActionFailure, (state, { error }) => ({
        ...state,
        comment: error
    })),

    on(ProfileActions.getProfileActionSuccess, (state, { user }) => {
        const updatedState = {
            ...state,
            currentUser: user
        };
    
        return updatedState;
    }),

    on(ProfileActions.updateProfileActionFailure, (state, { error }) => ({
        ...state,
        comment: error
    })),

    on(ProfileActions.updateProfileActionSuccess, (state, { comment }) => ({
        ...state,
        comment: comment
    })),
);

export const profileReducerFeatureKey = 'profile';
