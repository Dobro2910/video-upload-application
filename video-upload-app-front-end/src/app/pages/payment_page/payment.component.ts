import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ShoppingCartState } from '../../store/shopping_cart/shopping_cart.reducer';
import { ProductInCart } from '../../store/model/product.model';
import { Router } from '@angular/router';
import { removeProductAction, increaseProductQuantityAction, decreaseProductQuantityAction } from '../../store/shopping_cart/shopping_cart.action';
import { map, take } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import { PaymentDialogComponent } from './payment_dialog/payment_dialog.component';
import { PaymentState } from '../../store/payment/payment.reducer';
import { updatePaymentDetailAction } from '../../store/payment/payment.action';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  productsInCart$: Observable<ProductInCart[]>;
  comment$: Observable<string | null>;

  selectedPaymentMethod: string | null = null;
  totalPrice: number | undefined = 0 ;
  showComment = false;
  comment: string | null = null;

  constructor(private router: Router, 
              private store: Store<{ shoppingCart: ShoppingCartState, payment: PaymentState }>, 
              private dialog: MatDialog) {
    this.productsInCart$ = this.store.select(state => state.shoppingCart.productsInCart);
    this.comment$ = this.store.select(state => state.payment.comment);
  }

  ngOnInit(): void {
    console.log('Payment component initialized');

    this.productsInCart$.pipe(
      map(products => products.reduce((total, product) => total + (product.productPrice * product.productQuantity), 0))
    ).subscribe(total => {
      this.store.dispatch(updatePaymentDetailAction({ total }));
      
      // console log to check the total price of the payment
      this.store.select(state => state.payment.paymentDetail?.amount).pipe(
      ).subscribe(updatedTotal => {
        this.totalPrice = updatedTotal; // Update the total amount
        console.log('Updated Payment Total:', updatedTotal);
      });
    });

    this.comment$.pipe().subscribe(comment => {
      if (comment) {
        this.showCommentWithTimeout(comment);
      }
    });
  }

  // Method to show comment and hide it after 3 seconds
  showCommentWithTimeout(comment: string): void {
    this.comment = comment;
    this.showComment = true;

    setTimeout(() => {
      this.showComment = false;
    }, 5000); // Hide after 3 seconds
  }

  removeItemFromCart(removeProduct: ProductInCart): void {
    this.productsInCart$.pipe(
      take(1),
      map(productsInCart => productsInCart.find(product => product.productId === removeProduct.productId
                                                && product.productColor === removeProduct.productColor 
                                                && product.productSize === removeProduct.productSize))
    ).subscribe(filteredProducts  => {
      if (filteredProducts) {
        this.store.dispatch(removeProductAction({ product: filteredProducts }));
        this.showCommentWithTimeout('Product successfully remove!');
      }
    });
  }

  // increase the buying quantity of the product in the cart
  increaseQuantity(product: ProductInCart): void {
    if (product.productId) {
      this.store.dispatch(increaseProductQuantityAction({ product: product }));
      
      // Wait for the state to update, then log the new quantity
      this.store.select(state => state.shoppingCart.productsInCart).pipe(
        map(productsInCart => productsInCart.find(p => p.productId === product.productId
                                                       && p.productColor === product.productColor 
                                                       && p.productSize === product.productSize
        )),
        take(1)
      ).subscribe(updatedProduct => {
        // console log to get the product quantity after update
        if (updatedProduct) {
          console.log('Updated Quantity:', updatedProduct.productQuantity);
        }
      });
    }
  }
  
  // decrease the buying quantity of the product in the cart
  decreaseQuantity(product: ProductInCart): void {
    if (product.productId) {
      this.store.dispatch(decreaseProductQuantityAction({ product: product }));
      
      // Wait for the state to update, then log the new quantity
      this.store.select(state => state.shoppingCart.productsInCart).pipe(
        map(productsInCart => productsInCart.find(p => p.productId === product.productId
                                                  && p.productColor === product.productColor 
                                                  && p.productSize === product.productSize
        )),
        take(1)
      ).subscribe(updatedProduct => {
        // console log to get the product quantity after update
        if (updatedProduct) {
          console.log('Updated Quantity:', updatedProduct.productQuantity);
        }
      });
    }
  }

  goToHomePage(): void {
    this.router.navigate(['/home']);
  }

  displayPaymentMethod(): void {
    this.dialog.open(PaymentDialogComponent);
  }
}
