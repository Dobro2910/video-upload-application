import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProductActions from '../../store/product/product.action';
import { ProductState } from '../../store/product/product.reducer';

import { Product } from '../../store/model/product.model';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  // $ for observable variable
  products$: Observable<Product[] | null>;
  filterCheck$: Observable<Boolean>;
  currentPage: number = 1;

  // filter variable
  // productPrice: number;
  productGender: string = '';
  productCategory: string = '';
  productBrand: string = '';
  productSize: string = '';

  // goToPageNumber: number | null = null; // Property to store the input value

  constructor(private store: Store<{ product: ProductState }>) { 
    this.products$ = this.store.select(state => state.product.products);
    this.filterCheck$ = this.store.select(state => state.product.filterCheck);
  }

  ngOnInit(): void {
    console.log('Product component initialized');
    // this.store.dispatch(ProductActions.getAllProductAction());

    // Handling filter check observable
    this.filterCheck$.subscribe(filterCheck => {
      if (filterCheck) {
        console.log(filterCheck);
        this.findProductsByFilter();
      } else {
        console.log(filterCheck);
        this.loadProducts();
      }
    });

    // The filter operator in the products$ observable pipeline is used to ensure that only non-null values are processed by the 
    // subsequent subscribe block. This is important because the initial state of products$ might be null or undefined before the 
    // products are loaded or fetched from the store. By filtering out null values, you avoid unnecessary or potentially erroneous 
    // operations on the null values.
    this.products$.pipe(filter(products => products !== null)).subscribe(products => {
      if (products && products.length === 0 && this.currentPage > 1) {
        this.prevPage();
      }
    });
  }

  findProductsByFilter(): void {
    this.store.dispatch(ProductActions.getFilterProductAction({
      // productPrice: this.productPrice,
      productBrand: this.productBrand,
      productCategory: this.productCategory,
      productGender: this.productGender,
      productSize: this.productSize
    }));
  }

  loadProducts(): void {
    this.store.dispatch(ProductActions.getPaginatedProductAction({
      page: this.currentPage
    }));
  }

  // goToPage(): void {
  //   if (this.goToPageNumber !== null && this.goToPageNumber > 0) {
  //     this.currentPage = this.goToPageNumber;
  //     this.loadProducts();
  //   }
  // }

  nextPage(): void {
    this.currentPage++;
    this.loadProducts();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
    }
  }
}