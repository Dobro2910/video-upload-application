import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
    constructor() { }

    ngOnInit(): void {
      console.log('Shopping cart component initialized');
    }
}
