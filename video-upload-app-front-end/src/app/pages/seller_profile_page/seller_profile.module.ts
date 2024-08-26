import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SellerProfileComponent } from "./seller_profile.component";
import { SellerProfileRoutingModule } from "./seller_profile.routing";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [SellerProfileComponent],
  imports: [CommonModule, SellerProfileRoutingModule, SharedModule],
})

export class SellerProfileModule {}