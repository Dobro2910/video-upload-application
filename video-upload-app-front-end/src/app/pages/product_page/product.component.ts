import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProductReducer from '../../store/product/product.reducer';
import * as ProductActions from '../../store/product/product.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
    constructor(private store: Store<ProductReducer.ProductState>) { }

    ngOnInit(): void {
      this.store.dispatch(ProductActions.getAllProductAction());
    }
}