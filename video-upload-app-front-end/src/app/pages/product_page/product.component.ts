// import { Component, OnInit } from '@angular/core';
// import { Store } from '@ngrx/store';
// import * as ProductActions from '../../store/product/product.action';
// import { ProductState } from '../../store/product/product.reducer';
// import { Product } from '../../store/model/product.model';
// import { Observable } from 'rxjs';
// import { filter, tap } from 'rxjs/operators';

// import { Router, ActivatedRoute } from '@angular/router';
// import { combineLatest } from 'rxjs';

// @Component({
//   selector: 'app-product',
//   templateUrl: './product.component.html',
//   styleUrls: ['./product.component.scss'],
// })
// export class ProductComponent implements OnInit {
//   // $ for observable variable
//   products$: Observable<Product[] | null>;
//   filterCheck$: Observable<Boolean>;

//   // normal variable
//   productGender: string = '';
//   productCategory: string = '';
//   productBrand: string = '';
//   productSize: string = '';
//   currentPage: number = 1;

//   constructor(private store: Store<{ product: ProductState }>, private route: ActivatedRoute, private router: Router) { 
//     this.products$ = this.store.select(state => state.product.products);
//     this.filterCheck$ = this.store.select(state => state.product.filterCheck);
//   }

//   ngOnInit(): void {
//     console.log('Product component initialized');

//     // combineLatest([
//     //   this.filterCheck$,
//     //   this.route.queryParams
//     // ]).subscribe(([filterCheck, params]) => {

//     //   if ((params['gender'] || params['category'] || params['brand'] || params['size'] || params['page']) && !filterCheck) {
//     //     this.currentPage = params['page'] || 1,
//     //     this.productBrand = params['brand'] || '',
//     //     this.productCategory = params['category'] || '',
//     //     this.productGender = params['gender'] || '',
//     //     this.productSize =  params['size'] || ''

//     //     this.findProductsByFilter();
        
//     //     console.log("hello1");
//     //     console.log(filterCheck);
//     //   } else if (filterCheck) {
//     //     console.log("hello2");
//     //     console.log(filterCheck);

//     //     // clear all param from url after navigating
//     //     this.router.navigate([], {
//     //       relativeTo: this.route,
//     //       queryParams: {}
//     //     });

//     //     this.currentPage = 1;
//     //     this.findProductsByFilter();
//     //   } else if (!filterCheck) {
//     //     console.log("hello3");
//     //     console.log(filterCheck);

//     //     this.currentPage = 1;
//     //     this.loadProducts();
//     //   }
//     // });

//     this.filterCheck$.subscribe(filterCheck => {
//       if (filterCheck) {
//         this.findProductsByFilter();
//       } else if (!filterCheck) {
//         this.loadProducts();
//       }
//     });

//     // The filter operator in the products$ observable pipeline is used to ensure that only non-null values are processed by the 
//     // subsequent subscribe block. This is important because the initial state of products$ might be null or undefined before the 
//     // products are loaded or fetched from the store. By filtering out null values, you avoid unnecessary or potentially erroneous 
//     // operations on the null values.
//     this.products$.pipe(filter(products => products !== null)).subscribe(products => {
//       if (products && products.length === 0 && this.currentPage > 1) {
//         this.prevPage();
//       }
//     });
//   }

//   findProductsByFilter(): void {
//     if (this.productBrand == "" 
//       && this.productCategory == "" 
//       && this.productGender == "" 
//       && this.productSize == "") {
//         this.currentPage = 1;
//         this.loadProducts();
//     } else {
//       this.store.dispatch(ProductActions.getFilterProductAction({
//         filterPage: this.currentPage,
//         // productPrice: this.productPrice,
//         productBrand: this.productBrand,
//         productCategory: this.productCategory,
//         productGender: this.productGender,
//         productSize: this.productSize
//       }));
//     }
//   }

//   loadProducts(): void {
//     this.store.dispatch(ProductActions.getPaginatedProductAction({
//       page: this.currentPage
//     }));
//   }

//   nextPage(): void {
//     this.filterCheck$.pipe(
//       tap(filterCheck => {
//         if (filterCheck) {
//           this.currentPage++;
//           this.findProductsByFilter();
//         } else if (!filterCheck) {
//           this.currentPage++;
//           this.loadProducts();
//         }
//       })
//     ).subscribe();
//   }

//   prevPage(): void {
//     this.filterCheck$.pipe(
//       tap(filterCheck => {
//         if (filterCheck && this.currentPage > 1) {
//           this.currentPage--;
//           this.findProductsByFilter();
//         } else if (!filterCheck && this.currentPage > 1) {
//           this.currentPage--;
//           this.loadProducts();
//         }
//       })
//     ).subscribe();
//   }
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
      width: '600px',
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
          // this.filterSevice.increasePage();
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
          // this.filterSevice.decreasePage();
          this.filterVar.currentPage--;
          this.findProductsByFilter();
        } else if (!filterCheck && this.filterVar.currentPage > 1) {
          // this.filterSevice.decreasePage();
          this.filterVar.currentPage--;
          this.loadProducts();
        }
      })
    ).subscribe();
  }
}