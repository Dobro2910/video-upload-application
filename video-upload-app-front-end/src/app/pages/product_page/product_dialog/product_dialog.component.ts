import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductDisplay, ProductInCart } from '../../../store/model/product.model';
import { Store } from '@ngrx/store';
import { addProductAction, addProductActionFailure, resetShoppingCartCommentAction } from '../../../store/shopping_cart/shopping_cart.action';
import { ShoppingCartState } from '../../../store/shopping_cart/shopping_cart.reducer';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product_dialog.component.html',
  styleUrls: ['./product_dialog.component.scss']
})
export class ProductDialogComponent {
  // observable
  productsInCart$: Observable<ProductInCart[]>;
  comment$: Observable<string | null>;

  // normal variable
  productInCart: ProductInCart | null = null;
  selectedProductId: any;
  selectedColorDetails: any; // To hold the selected color's details
  selectedColor: string | null = null;
  selectedSize: string | null = null; // To hold the selected size
  showComment = false;
  comment: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductDisplay,
    // private store: Store,
    private store: Store<{ shoppingCart: ShoppingCartState }>,
    // private snackBar: MatSnackBar
  ) {
    this.productsInCart$ = this.store.select(state => state.shoppingCart.productsInCart);
    this.comment$ = this.store.select(state => state.shoppingCart.comment);
  }

  ngOnInit(): void {
    console.log('Product dialog component initialized');
  }

  // close the product dialog
  onClose(): void {
    this.store.dispatch(resetShoppingCartCommentAction());
    this.dialogRef.close();
  }

  addToCart(): void {
    if (this.selectedColorDetails && this.selectedSize) {
      this.productsInCart$.pipe(
        take(1),
        map(productsInCart => productsInCart.find(product => 
          product.productId === this.selectedProductId && 
          product.productColor === this.selectedColor && 
          product.productSize === this.selectedSize))
      ).subscribe(product => {
        if (product) {
          this.store.dispatch(addProductActionFailure({ comment: 'Product Already In Cart' }));
          this.comment$.pipe(take(1)).subscribe(comment => {
            if (comment) {
              this.showCommentWithTimeout(comment);
            }
          });
        } else {
          this.productInCart = {
            productId: this.data.productId,
            productName: this.data.productName,
            productDescription: this.data.productDescription,
            productPrice: this.data.productPrice,
            productGender: this.data.productGender,
            productImage: this.data.productImage,
            productColor: this.selectedColor,
            productSize: this.selectedSize,
            productQuantity: 1
          };
          this.store.dispatch(addProductAction({ product: this.productInCart }));
          this.comment$.pipe(take(1)).subscribe(comment => {
            if (comment) {
              this.showCommentWithTimeout(comment);
            }
          });
        }
      });
    }
  }

  // Method to show comment and hide it after 3 seconds
  showCommentWithTimeout(comment: string): void {
    this.comment = comment;
    this.showComment = true;

    setTimeout(() => {
      this.showComment = false;
    }, 3000); // Hide after 3 seconds
  }

  selectColor(colorDetail: any): void {
    // to loop through the productColorSizeDetail
    this.selectedColorDetails = colorDetail;

    // choose correct color
    this.selectedProductId = this.data.productId;
    this.selectedColor = colorDetail.productColor;
    this.selectedSize = null; // Reset size selection when a new color is selected
  }

  selectSize(sizeDetail: any): void {
    // choose correct size
    this.selectedSize = sizeDetail;
  }
}

