import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SellerProfileComponent } from "./seller_profile.component";
import { SellerProfileRoutingModule } from "./seller_profile.routing";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";
// import { UpdateProfileDialogComponent } from "../shared/update_profile_dialog/update_profile_dialog.component";

@NgModule({
  declarations: [SellerProfileComponent],
  imports: [CommonModule, SellerProfileRoutingModule, SharedModule, FormsModule],
})

export class SellerProfileModule {}