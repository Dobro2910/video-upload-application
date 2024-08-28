import { createAction, props } from '@ngrx/store';
import { PaymentDetail } from '../model/payment.model';
import { ProductInCart } from "../model/product.model";
import { StripeCardElement, Stripe } from '@stripe/stripe-js';

// update the total cost of all the products in the cart
export const UPDATE_PAYMENT_DETAIL = '[payment] update payment detail';
export const updatePaymentDetailAction = createAction(UPDATE_PAYMENT_DETAIL, props<{ total: number }>());

// create new payment intent
export const INITIATE_PAYMENT = '[payment] initiate payment';
export const initiatePaymentAction = createAction(
  INITIATE_PAYMENT,
  props<{ paymentDetail: PaymentDetail }>()
);

export const INITIATE_PAYMENT_SUCCESS = '[payment] initiate payment success';
export const initiatePaymentActionSuccess = createAction(
  INITIATE_PAYMENT_SUCCESS,
  props<{ clientSecret: string }>()
);

export const INITIATE_PAYMENT_FAILURE = '[payment] initiate payment failure';
export const initiatePaymentActionFailure = createAction(
  INITIATE_PAYMENT_FAILURE,
  props<{ error: string }>()
);

// save payment order into the database
export const SAVE_PAYMENT_ORDER ='[payment] save payment order'
export const savePaymentOrderAction=createAction(SAVE_PAYMENT_ORDER, props<{ productsInCart: ProductInCart[] }>());

export const SAVE_PAYMENT_ORDER_SUCCESS ='[payment] save payment order'
export const savePaymentOrderActionSuccess=createAction(SAVE_PAYMENT_ORDER_SUCCESS);

export const SAVE_PAYMENT_ORDER_FAILURE ='[payment] save payment order'
export const savePaymentOrderActionFailure=createAction(SAVE_PAYMENT_ORDER_FAILURE, props<{ error: string }>());
