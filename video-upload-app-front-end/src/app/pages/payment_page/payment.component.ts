import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ShoppingCartState } from '../../store/shopping_cart/shopping_cart.reducer';
import { ProductInCart } from '../../store/model/product.model';
import { Router } from '@angular/router';

import { removeProductAction } from '../../store/shopping_cart/shopping_cart.action';
import { map, take } from 'rxjs/operators';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  productsInCart$: Observable<ProductInCart[]>;
  selectedPaymentMethod: string | null = null;

  constructor(private router: Router, private store: Store<{ shoppingCart: ShoppingCartState }>) {
    this.productsInCart$ = this.store.select(state => state.shoppingCart.productsInCart);
  }

  ngOnInit(): void {
    console.log('Payment component initialized');
  }

  makePayment(): void {
    if (this.selectedPaymentMethod) {
      // Handle the payment process
      console.log(`Payment made using ${this.selectedPaymentMethod}`);
    } else {
      alert('Please select a payment method.');
    }
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
      } else if (!filteredProducts) {
        console.log('Product is already remove');
      }
    });
  }

  goToHomePage(): void {
    this.router.navigate(['/home']);
  }
}
