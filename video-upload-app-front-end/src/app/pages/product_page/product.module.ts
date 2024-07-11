import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductRoutingModule } from "./product.routing";
import { ProductComponent } from "./product.component";
import { SharedModule } from "../shared/shared.moduel";

@NgModule({
  declarations: [ProductComponent],
  imports: [CommonModule, SharedModule, ProductRoutingModule],
})

export class ProductModule {}