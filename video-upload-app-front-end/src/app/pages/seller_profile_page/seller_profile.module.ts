import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SellerProfileComponent } from "./seller_profile.component";
import { SellerProfileRoutingModule } from "./seller_profile.routing";

@NgModule({
  declarations: [SellerProfileComponent],
  imports: [CommonModule, SellerProfileRoutingModule],
})

export class SellerProfileModule {}