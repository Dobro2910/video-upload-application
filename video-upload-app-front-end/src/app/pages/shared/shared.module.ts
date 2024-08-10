// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side_bar/sidebar.component';
import { ShoppingCartComponent } from './shopping_cart/shoppingcart.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    SideBarComponent,
    ShoppingCartComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SideBarComponent,
    ShoppingCartComponent,
    ProfileComponent
  ]
})

export class SharedModule {}
