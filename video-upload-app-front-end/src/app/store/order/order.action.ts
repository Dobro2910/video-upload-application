import { Order } from "../model/order.model";
import { createAction, props } from "@ngrx/store";

// get paginated pages load actions
export const GET_PAGINATED_ORDER ='[order] get paginated order';
export const GET_PAGINATED_ORDER_FAILURE ='[order] get paginated order fail';
export const GET_PAGINATED_ORDER_SUCCESS ='[order] get paginated order success';
export const getPaginatedOrdersAction = createAction(GET_PAGINATED_ORDER, props<{page: number, sellerEmail: string}>());
export const getPaginatedOrdersFailure = createAction(GET_PAGINATED_ORDER_FAILURE, props<{error: any}>());
export const getPaginatedOrdersSuccess = createAction(GET_PAGINATED_ORDER_SUCCESS, props<{orders: Order[]}>());

// complete order actions
export const COMPLETE_ORDER ='[order] complete order';
export const COMPLETE_ORDER_FAILURE ='[order] complete order fail';
export const COMPLETE_ORDER_SUCCESS ='[order] complete order success';
export const completeOrderAction = createAction(COMPLETE_ORDER, props<{orderId: string, productIndex: number}>());
export const completeOrderActionFailure = createAction(COMPLETE_ORDER_FAILURE, props<{error: any}>());
export const completeOrderActionSuccess = createAction(COMPLETE_ORDER_SUCCESS, props<{comment: string}>());