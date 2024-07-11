import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductRoutingModule } from "./product.routing";
import { ProductComponent } from "./product.component";

import { SideBarComponent } from "../shared/side_bar/sidebar.component";
import { ShoppingCartComponent } from "../shared/shopping_cart/shoppingcart.component";

@NgModule({
  declarations: [ProductComponent, SideBarComponent, ShoppingCartComponent],
  imports: [CommonModule, ProductRoutingModule],
})

export class ProductModule {}