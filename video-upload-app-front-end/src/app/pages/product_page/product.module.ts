import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductRoutingModule } from "./product.routing";
import { ProductComponent } from "./product.component";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from '@angular/forms';

import { ProductDialogComponent } from "./product_dialog/product_dialog.component";
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ProductComponent, ProductDialogComponent],
  imports: [CommonModule, SharedModule, ProductRoutingModule, FormsModule, MatDialogModule, MatIconModule],
})

export class ProductModule {}