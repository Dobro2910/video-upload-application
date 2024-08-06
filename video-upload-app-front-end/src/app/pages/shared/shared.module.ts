// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side_bar/sidebar.component';
import { ShoppingCartComponent } from './shopping_cart/shoppingcart.component';
import { UserProfileComponent } from './user_profile/userprofile.component';

@NgModule({
  declarations: [
    SideBarComponent,
    ShoppingCartComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SideBarComponent,
    ShoppingCartComponent,
    UserProfileComponent
  ]
})
export class SharedModule {}
