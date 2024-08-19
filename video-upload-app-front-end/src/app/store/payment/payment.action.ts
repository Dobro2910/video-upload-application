import { createAction, props } from '@ngrx/store';
import { PaymentDetail } from '../model/payment.model';
import { StripeCardElement } from '@stripe/stripe-js';
import { ProductInCart } from "../model/product.model";

export const INITIATE_PAYMENT = '[payment] initiate payment';
export const initiatePaymentAction = createAction(
  INITIATE_PAYMENT,
  props<{ paymentDetail: PaymentDetail, cardElement: StripeCardElement, cardHolderName: string, productsInCart: ProductInCart[] }>()
);

export const CONFIRM_PAYMENT = '[payment] confirm payment';
export const confirmPaymentAction = createAction(
    CONFIRM_PAYMENT,
    props<{ clientSecret: string, cardElement: StripeCardElement, cardHolderName: string, productsInCart: ProductInCart[] }>()
);

export const INITIATE_PAYMENT_SUCCESS = '[payment] initiate payment success';
export const initiatePaymentActionSuccess = createAction(
  INITIATE_PAYMENT_SUCCESS,
  props<{ paymentIntentId: string }>()
);

export const INITIATE_PAYMENT_FAILURE = '[payment] initiate payment failure';
export const initiatePaymentActionFailure = createAction(
  INITIATE_PAYMENT_FAILURE,
  props<{ error: string }>()
);

export const UPDATE_PAYMENT_DETAIL = '[payment] update payment detail';
export const updatePaymentDetailAction = createAction(UPDATE_PAYMENT_DETAIL, props<{ total: number }>());

// save payment order into the database
export const SAVE_PAYMENT_ORDER ='[payment] save payment order'
export const savePaymentOrderAction=createAction(SAVE_PAYMENT_ORDER, props<{ paymentIntentId: string, productsInCart: ProductInCart[] }>());


