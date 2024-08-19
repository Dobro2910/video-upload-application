import { createReducer, on } from '@ngrx/store';
import {
  initiatePaymentActionSuccess,
  initiatePaymentActionFailure,
  updatePaymentDetailAction,
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
  on(initiatePaymentActionSuccess, (state, { paymentIntentId }) => ({
    ...state,
    paymentIntentId: paymentIntentId,
    errorMessage: null,
  })),
  on(initiatePaymentActionFailure, (state, { error }) => ({
    ...state,
    errorMessage: error,
  })),
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