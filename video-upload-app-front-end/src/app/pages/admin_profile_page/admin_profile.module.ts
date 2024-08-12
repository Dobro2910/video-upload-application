import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminProfileComponent } from "./admin_profile.component";
import { AdminProfileRoutingModule } from "./admin_profile.routing";

@NgModule({
  declarations: [AdminProfileComponent],
  imports: [CommonModule, AdminProfileRoutingModule],
})

export class AdminProfileModule {}