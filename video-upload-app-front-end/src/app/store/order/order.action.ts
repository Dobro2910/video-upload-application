import { Order } from "../model/order.model";
import { createAction, props } from "@ngrx/store";

// get paginated pages load actions
export const GET_PAGINATED_ORDER ='[order] get paginated order';
export const GET_PAGINATED_ORDER_FAILURE ='[order] get paginated order fail';
export const GET_PAGINATED_ORDER_SUCCESS ='[order] get paginated order success';
export const getPaginatedOrdersAction = createAction(GET_PAGINATED_ORDER, props<{page: number, sellerEmail: string}>());
export const getPaginatedOrdersFailure = createAction(GET_PAGINATED_ORDER_FAILURE, props<{error: any}>());
export const getPaginatedOrdersSuccess = createAction(GET_PAGINATED_ORDER_SUCCESS, props<{orders: Order[]}>());