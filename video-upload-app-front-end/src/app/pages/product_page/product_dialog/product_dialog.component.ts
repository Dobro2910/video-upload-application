import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductDisplay, ProductInCart } from '../../../store/model/product.model';
import { Store } from '@ngrx/store';
import { addProductAction } from '../../../store/shopping_cart/shopping_cart.action';
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

  // normal variable
  productInCart: ProductInCart | null = null;
  selectedProductId: any;
  selectedColorDetails: any; // To hold the selected color's details
  selectedColor: string | null = null;
  selectedSize: string | null = null; // To hold the selected size

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductDisplay,
    // private store: Store,
    private store: Store<{ shoppingCart: ShoppingCartState }>
  ) {
    this.productsInCart$ = this.store.select(state => state.shoppingCart.productsInCart);
  }

  ngOnInit(): void {
    console.log('Product dialog component initialized');

  }

  // close the product dialog
  onClose(): void {
    this.dialogRef.close();
  }

  addToCart(): void {
    if (this.selectedColorDetails && this.selectedSize) {
      this.productsInCart$.pipe(
        take(1),
        map(productsInCart => productsInCart.find(product => product.productId === this.selectedProductId
                                                  && product.productColor === this.selectedColor 
                                                  && product.productSize === this.selectedSize))
      ).subscribe(product => {
        if (product) {
          console.log('Product is already in the cart:');
        } else if (!product) {
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
          console.log(this.productInCart);
          this.store.dispatch(addProductAction({ product: this.productInCart }));
        }
      });
    }
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

