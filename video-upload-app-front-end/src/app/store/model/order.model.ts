export interface Order {
    orderId: string;
    productId: string[];
    productName: string[];
    productDescription: string[];
    productPrice: number[];
    productGender: string[];
    productImage: string[];
    productColor: string[];
    productSize: string[];
    productQuantity: number[];
    deliveryLocation: string;
    buyerEmail: string;
    totalPrice: number;
    orderDelivered: boolean;
}