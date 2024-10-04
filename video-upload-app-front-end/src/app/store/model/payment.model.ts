import { ProductInCart } from "./product.model";

export interface PaymentDetail {
    amount: number;
    currency: string;
}

export interface PaymentOrder {
    productsInCart: ProductInCart[];
    deliveryLocation: string;
    buyerEmail: string;
}
