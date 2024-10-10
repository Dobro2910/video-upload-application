import { createReducer, on } from '@ngrx/store';
import * as OrderActions from './order.action';
import { Order } from '../model/order.model';

// Define the shape of the product state
export interface OrderState {
  orders: Order[] | null;
  comment: string | null;
}

// Initial state of the product feature
const initialState: OrderState = {
    orders: null,
    comment: null,
};

// Reducer function using createReducer from @ngrx/store
export const orderReducer = createReducer(
  initialState,

  // get pagination product state
  on(OrderActions.getPaginatedOrdersFailure, (state, { error }) => ({
    ...state, // Spread operator to create a shallow copy of current state
    comment: error,
    orders: null
  })),

  on(OrderActions.getPaginatedOrdersSuccess, (state, { orders }) => ({
    ...state, // Spread operator to create a shallow copy of current state
    orders: orders
  })),

  // get pagination product state
  on(OrderActions.completeOrderActionFailure, (state, { error }) => ({
    ...state, // Spread operator to create a shallow copy of current state
    comment: error,
  })),

  on(OrderActions.completeOrderActionSuccess, (state, { comment }) => ({
    ...state, // Spread operator to create a shallow copy of current state
    comment: comment
  })),
);

export const orderReducerFeatureKey = 'order';
