// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side_bar/sidebar.component';
import { ShoppingCartComponent } from './shopping_cart/shoppingcart.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateProfileDialogComponent } from './update_profile_dialog/update_profile_dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SideBarComponent,
    ShoppingCartComponent,
    ProfileComponent,
    UpdateProfileDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule 
  ],
  exports: [
    SideBarComponent,
    ShoppingCartComponent,
    ProfileComponent,
    UpdateProfileDialogComponent
  ]
})

export class SharedModule {}
