// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { ProductDisplay } from '../../../store/model/product.model';

// @Component({
//   selector: 'app-product_dialog',
//   templateUrl: './product_dialog.component.html',
//   styleUrls: ['./product_dialog.component.scss']
// })

// export class ProductDialogComponent {
//   selectedColorDetails: any; // To hold the selected color's details
//   selectedSize: string | null = null; // To hold the selected size
//   selectedStock: number | null = null; // To hold the stock corresponding to the selected size

//   constructor(
//     public dialogRef: MatDialogRef<ProductDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: ProductDisplay
//   ) {}

//   onClose(): void {
//     this.dialogRef.close();
//   }

//   selectColor(colorDetail: any): void {
//     this.selectedColorDetails = colorDetail;
//     this.selectedSize = null; // Reset size selection when a new color is selected
//     this.selectedStock = null; // Reset stock display when a new color is selected
//   }

//   selectSize(selectedSize: string): void {
//     this.selectedSize = selectedSize;
//     const sizeIndex = this.selectedColorDetails.productSize.indexOf(selectedSize);
//     if (sizeIndex !== -1) {
//       this.selectedStock = this.selectedColorDetails.productStock[sizeIndex];
//     }
//   }
// }

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductDisplay } from '../../../store/model/product.model';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product_dialog.component.html',
  styleUrls: ['./product_dialog.component.scss']
})
export class ProductDialogComponent {
  selectedColorDetails: any; // To hold the selected color's details
  selectedSize: string | null = null; // To hold the selected size
  selectedStock: number | null = null; // To hold the stock corresponding to the selected size

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductDisplay
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  selectColor(colorDetail: any): void {
    this.selectedColorDetails = colorDetail;
    this.selectedSize = null; // Reset size selection when a new color is selected
    this.selectedStock = null; // Reset stock display when a new color is selected
  }

  selectSize(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedSize = selectElement.value;
    const sizeIndex = this.selectedColorDetails.productSize.indexOf(this.selectedSize);
    if (sizeIndex !== -1) {
      this.selectedStock = this.selectedColorDetails.productStock[sizeIndex];
    }
  }
}

