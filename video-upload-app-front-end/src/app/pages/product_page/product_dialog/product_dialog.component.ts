// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { ProductDisplay } from '../../../store/model/product.model';

// @Component({
//   selector: 'app-product_dialog',
//   templateUrl: './product_dialog.component.html',
//   styleUrls: ['./product_dialog.component.scss']
// })

// export class ProductDialogComponent {
//   constructor(
//     public dialogRef: MatDialogRef<ProductDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: ProductDisplay
//   ) {}

//   onClose(): void {
//     this.dialogRef.close();
//   }
// }

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../store/model/product.model';

@Component({
  selector: 'app-product_dialog',
  templateUrl: './product_dialog.component.html',
  styleUrls: ['./product_dialog.component.scss']
})

export class ProductDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
