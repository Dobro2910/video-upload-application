import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProductActions from '../../store/product/product.action';
import { ProductState } from '../../store/product/product.reducer';
import { ProductDisplay } from '../../store/model/product.model';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { FilterService } from '../../service/filter.service';

import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from './product_dialog/product_dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(private store: Store<{ product: ProductState }>, private filterSevice: FilterService, private dialog: MatDialog) { 
    this.productsDisplay$ = this.store.select(state => state.product.productsDisplay);
    this.filterCheck$ = this.store.select(state => state.product.filterCheck);
  }

  // $ for observable variable
  productsDisplay$: Observable<ProductDisplay[] | null>;
  filterCheck$: Observable<Boolean>;

  // normal variable
  filterVar = this.filterSevice.getFilters();

  ngOnInit(): void {
    console.log('Product component initialized');

    // if we press nextpage and there are no product left to display, go back
    this.productsDisplay$.subscribe(productsDisplay => {
        if (!productsDisplay && this.filterVar.currentPage > 1) {
          console.log("hello0");
          this.prevPage();
        }
      }
    );

    this.filterCheck$.subscribe(filterCheck => {
      // filter to navigate from home page and side bar
      if ((this.filterVar.productBrand || this.filterVar.productCategory || this.filterVar.productGender || this.filterVar.productSize) && !filterCheck) {
        console.log("hello1");
        console.log(filterCheck);
        this.getPaginatedProductsByFilter();
      } else if (filterCheck) {
        console.log("hello2");
        console.log(filterCheck);
        this.getPaginatedProductsByFilter();
      } else if (!filterCheck) {
        console.log("hello3");
        console.log(filterCheck);
        this.loadProducts();
      }
      console.log(this.filterVar.productGender + " " + this.filterVar.productCategory + " " + this.filterVar.productSize + " " + this.filterVar.productBrand);
    });
  }

  displayProduct(productDisplay: ProductDisplay): void {
    this.dialog.open(ProductDialogComponent, {
      data: productDisplay
    });
  }

  getPaginatedProductsByFilter(): void {
    this.store.dispatch(ProductActions.getPaginatedProductsByFilterAction({
      filterPage: this.filterVar.currentPage,
      productBrand: this.filterVar.productBrand,
      productCategory: this.filterVar.productCategory,
      productGender: this.filterVar.productGender,
      productSize: this.filterVar.productSize
    }));
  }

  loadProducts(): void {
    this.store.dispatch(ProductActions.getPaginatedProductsAction({
      page: this.filterVar.currentPage
    }));
  }

  nextPage(): void {
    this.filterCheck$.pipe(
      tap(filterCheck => {
        if (filterCheck) {
          this.filterVar.currentPage++;
          this.getPaginatedProductsByFilter();
        } else if (!filterCheck) {
          this.filterVar.currentPage++;
          this.loadProducts();
        }
      })
    ).subscribe();
  }

  prevPage(): void {
    this.filterCheck$.pipe(
      tap(filterCheck => {
        if (filterCheck && this.filterVar.currentPage > 1) {
          this.filterVar.currentPage--;
          this.getPaginatedProductsByFilter();
        } else if (!filterCheck && this.filterVar.currentPage > 1) {
          this.filterVar.currentPage--;
          this.loadProducts();
        }
      })
    ).subscribe();
  }
}