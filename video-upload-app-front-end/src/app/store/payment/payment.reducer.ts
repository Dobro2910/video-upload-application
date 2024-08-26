import { createReducer, on } from '@ngrx/store';
import {
  initiatePaymentActionSuccess,
  initiatePaymentActionFailure,
  updatePaymentDetailAction,
  savePaymentOrderActionSuccess,
  savePaymentOrderActionFailure,
} from './payment.action';
import { PaymentDetail } from '../model/payment.model';

export interface PaymentState {
  clientSecret: string | null;
  errorMessage: string | null;
  paymentIntentId: string | null;
  paymentDetail: PaymentDetail | null;
}

const initialState: PaymentState = {
  clientSecret: null,
  errorMessage: null,
  paymentIntentId: null,
  paymentDetail: null
};

export const paymentReducer = createReducer(
  initialState,
  // create payment intent
  on(initiatePaymentActionSuccess, (state, { clientSecret }) => ({
    ...state,
    clientSecret: clientSecret
  })),

  on(initiatePaymentActionFailure, (state, { error }) => ({
    ...state,
    errorMessage: error
  })),

  // save the product order into the database
  on(savePaymentOrderActionSuccess, state => {
    // No state changes; just return the current state as is.
    return { ...state };
  }),

  on(savePaymentOrderActionFailure, (state, { error }) => ({
    ...state,
    errorMessage: error
  })),

  // update the payment detail (calculate total price) action everytime new 
  // product is added into the cart or increase or decrease in quantity order
  on(updatePaymentDetailAction, (state, { total }) => ({
    ...state,
    paymentDetail: {
        ...state.paymentDetail, // Maintain other details (if any) in paymentDetail
        amount: total,
        currency: 'aud'
    },
  })),
);

export const paymentReducerFeatureKey = 'payment';