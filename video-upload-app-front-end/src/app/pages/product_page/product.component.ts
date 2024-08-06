// import { Component, OnInit } from '@angular/core';
// import { Store } from '@ngrx/store';
// import * as ProductActions from '../../store/product/product.action';
// import { ProductState } from '../../store/product/product.reducer';
// import { ProductDisplay } from '../../store/model/product.model';
// import { Observable } from 'rxjs';
// import { filter, tap } from 'rxjs/operators';
// import { FilterService } from '../../service/filter.service';

// import { MatDialog } from '@angular/material/dialog';
// import { ProductDialogComponent } from './product_dialog/product_dialog.component';

// @Component({
//   selector: 'app-product',
//   templateUrl: './product.component.html',
//   styleUrls: ['./product.component.scss'],
// })
// export class ProductComponent implements OnInit {
//   constructor(private store: Store<{ productState: ProductState }>, private filterSevice: FilterService, private dialog: MatDialog) { 
//     this.productsDisplay$ = this.store.select(state => state.productState.productsDisplay);
//     this.filterCheck$ = this.store.select(state => state.productState.filterCheck);
//   }

//   // $ for observable variable
//   productsDisplay$: Observable<ProductDisplay[] | null>;
//   filterCheck$: Observable<Boolean>;

//   // normal variable
//   filterVar = this.filterSevice.getFilters();

//   ngOnInit(): void {
//     console.log('Product component initialized');

//     this.filterCheck$.subscribe(filterCheck => {
//       // filter to navigate from home page and side bar
//       if ((this.filterVar.productBrand || this.filterVar.productCategory || this.filterVar.productGender || this.filterVar.productSize) && !filterCheck) {
//         console.log("hello1");
//         console.log(filterCheck);
//         this.findProductsByFilter();
//       } else if (filterCheck) {
//         console.log("hello2");
//         console.log(filterCheck);
//         this.findProductsByFilter();
//       } else if (!filterCheck) {
//         console.log("hello3");
//         console.log(filterCheck);
//         this.loadProducts();
//       }
//       console.log(this.filterVar.productGender + " " + this.filterVar.productCategory + " " + this.filterVar.productSize + " " + this.filterVar.productBrand);
//     });

//     // The filter operator in the products$ observable pipeline is used to ensure that only non-null values are processed by the 
//     // subsequent subscribe block. This is important because the initial state of products$ might be null or undefined before the 
//     // products are loaded or fetched from the store. By filtering out null values, you avoid unnecessary or potentially erroneous 
//     // operations on the null values.
//     this.productsDisplay$.pipe(filter(productsDisplay => productsDisplay !== null)).subscribe(productsDisplay => {
//       if (productsDisplay && productsDisplay.length === 0 && this.filterVar.currentPage > 1) {
//         this.prevPage();
//       }
//     });
//   }

//   displayIndividualProduct(productDisplay: ProductDisplay): void {
//     this.dialog.open(ProductDialogComponent, {
//       data: productDisplay
//     });
//   }

//   findProductsByFilter(): void {
//     this.store.dispatch(ProductActions.getFilterProductAction({
//       filterPage: this.filterVar.currentPage,
//       productBrand: this.filterVar.productBrand,
//       productCategory: this.filterVar.productCategory,
//       productGender: this.filterVar.productGender,
//       productSize: this.filterVar.productSize
//     }));
//   }

//   loadProducts(): void {
//     this.store.dispatch(ProductActions.getPaginatedProductAction({
//       page: this.filterVar.currentPage
//     }));
//   }

//   nextPage(): void {
//     this.filterCheck$.pipe(
//       tap(filterCheck => {
//         if (filterCheck) {
//           this.filterVar.currentPage++;
//           this.findProductsByFilter();
//         } else if (!filterCheck) {
//           this.filterVar.currentPage++;
//           this.loadProducts();
//         }
//       })
//     ).subscribe();
//   }

//   prevPage(): void {
//     this.filterCheck$.pipe(
//       tap(filterCheck => {
//         if (filterCheck && this.filterVar.currentPage > 1) {
//           this.filterVar.currentPage--;
//           this.findProductsByFilter();
//         } else if (!filterCheck && this.filterVar.currentPage > 1) {
//           this.filterVar.currentPage--;
//           this.loadProducts();
//         }
//       })
//     ).subscribe();
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProductActions from '../../store/product/product.action';
import { ProductState } from '../../store/product/product.reducer';
import { Product } from '../../store/model/product.model';
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
    this.products$ = this.store.select(state => state.product.products);
    this.filterCheck$ = this.store.select(state => state.product.filterCheck);
  }

  // $ for observable variable
  products$: Observable<Product[] | null>;
  filterCheck$: Observable<Boolean>;

  // normal variable
  filterVar = this.filterSevice.getFilters();

  ngOnInit(): void {
    console.log('Product component initialized');

    this.filterCheck$.subscribe(filterCheck => {
      // filter to navigate from home page and side bar
      if ((this.filterVar.productBrand || this.filterVar.productCategory || this.filterVar.productGender || this.filterVar.productSize) && !filterCheck) {
        console.log("hello1");
        console.log(filterCheck);
        this.findProductsByFilter();
      } else if (filterCheck) {
        console.log("hello2");
        console.log(filterCheck);
        this.findProductsByFilter();
      } else if (!filterCheck) {
        console.log("hello3");
        console.log(filterCheck);
        this.loadProducts();
      }
      console.log(this.filterVar.productGender + " " + this.filterVar.productCategory + " " + this.filterVar.productSize + " " + this.filterVar.productBrand);
    });

    // The filter operator in the products$ observable pipeline is used to ensure that only non-null values are processed by the 
    // subsequent subscribe block. This is important because the initial state of products$ might be null or undefined before the 
    // products are loaded or fetched from the store. By filtering out null values, you avoid unnecessary or potentially erroneous 
    // operations on the null values.
    this.products$.pipe(filter(products => products !== null)).subscribe(products => {
      if (products && products.length === 0 && this.filterVar.currentPage > 1) {
        this.prevPage();
      }
    });
  }

  displayProduct(product: Product): void {
    this.dialog.open(ProductDialogComponent, {
      data: product
    });
  }

  findProductsByFilter(): void {
    this.store.dispatch(ProductActions.getFilterProductAction({
      filterPage: this.filterVar.currentPage,
      productBrand: this.filterVar.productBrand,
      productCategory: this.filterVar.productCategory,
      productGender: this.filterVar.productGender,
      productSize: this.filterVar.productSize
    }));
  }

  loadProducts(): void {
    this.store.dispatch(ProductActions.getPaginatedProductAction({
      page: this.filterVar.currentPage
    }));
  }

  nextPage(): void {
    this.filterCheck$.pipe(
      tap(filterCheck => {
        if (filterCheck) {
          this.filterVar.currentPage++;
          this.findProductsByFilter();
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
          this.findProductsByFilter();
        } else if (!filterCheck && this.filterVar.currentPage > 1) {
          this.filterVar.currentPage--;
          this.loadProducts();
        }
      })
    ).subscribe();
  }
}