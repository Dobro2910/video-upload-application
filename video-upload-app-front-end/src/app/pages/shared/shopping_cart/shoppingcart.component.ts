import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ShoppingCartState } from '../../../store/shopping_cart/shopping_cart.reducer';
import { ProductInCart } from '../../../store/model/product.model';
import { Observable } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';
import { UserRole } from '../../../store/model/user.model';
import { AuthenticationService } from '../../../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  
  // Observable for the products in the cart
  productsInCart$: Observable<ProductInCart[] | []>;
  
  // Normal variable to hold the cart count
  cartCount: number = 0;

  constructor(private router: Router, private store: Store<{ shoppingCart: ShoppingCartState }>, private authService: AuthenticationService) { 
    // Select the productsInCart observable from the store
    this.productsInCart$ = this.store.select(state => state.shoppingCart.productsInCart);
  }

  ngOnInit(): void {
    console.log('Shopping cart component initialized');

    // if we press nextpage and there are no product left to display, go back
    this.productsInCart$.subscribe(productsInCart => {
        this.cartCount = productsInCart.length;
      }
    );
  }

  goToPaymentPage(): void {
    const jwtHelper = new JwtHelperService(); // Create an instance of JwtHelperService to manage JWT tokens
    const token = this.authService.getToken(); // Retrieve the JWT token from local storage

    if (token && !jwtHelper.isTokenExpired(token)) {
      this.router.navigate(['/payment']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}

