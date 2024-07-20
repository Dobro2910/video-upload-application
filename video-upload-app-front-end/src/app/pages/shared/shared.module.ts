// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side_bar/sidebar.component';
import { ShoppingCartComponent } from './shopping_cart/shoppingcart.component';

@NgModule({
  declarations: [
    SideBarComponent,
    ShoppingCartComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SideBarComponent,
    ShoppingCartComponent
  ]
})
export class SharedModule {}
