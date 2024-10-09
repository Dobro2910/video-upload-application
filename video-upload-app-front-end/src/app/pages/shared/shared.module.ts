// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side_bar/sidebar.component';
import { ShoppingCartComponent } from './shopping_cart/shoppingcart.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateProfileDialogComponent } from './update_profile_dialog/update_profile_dialog.component';
import { FormsModule } from '@angular/forms';
import { SellerDashboardIconComponent } from './seller_dashboard/seller_dashboard_icon.component';

@NgModule({
  declarations: [
    SideBarComponent,
    ShoppingCartComponent,
    ProfileComponent,
    UpdateProfileDialogComponent,
    SellerDashboardIconComponent
  ],
  imports: [
    CommonModule,
    FormsModule 
  ],
  exports: [
    SideBarComponent,
    ShoppingCartComponent,
    ProfileComponent,
    UpdateProfileDialogComponent,
    SellerDashboardIconComponent
  ]
})

export class SharedModule {}
