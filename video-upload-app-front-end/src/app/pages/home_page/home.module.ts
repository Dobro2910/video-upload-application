import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeRoutingModule } from "./home.routing";
import { HomeComponent } from "./home.component";

import { SideBarComponent } from "../shared/side_bar/sidebar.component";
import { ShoppingCartComponent } from "../shared/shopping_cart/shoppingcart.component";

@NgModule({
  declarations: [HomeComponent, SideBarComponent, ShoppingCartComponent],
  imports: [CommonModule, HomeRoutingModule],
})

export class HomeModule {}