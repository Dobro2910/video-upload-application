import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminProfileComponent } from "./admin_profile.component";
import { AdminProfileRoutingModule } from "./admin_profile.routing";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [AdminProfileComponent],
  imports: [CommonModule, AdminProfileRoutingModule, SharedModule],
})

export class AdminProfileModule {}