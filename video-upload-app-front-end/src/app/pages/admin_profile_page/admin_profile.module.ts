import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminProfileComponent } from "./admin_profile.component";
import { AdminProfileRoutingModule } from "./admin_profile.routing";
import { SharedModule } from "../shared/shared.module";

import { FormsModule } from '@angular/forms';
import { UpdateProfileDialogComponent } from "../shared/update_profile_dialog/update_profile_dialog.component";

@NgModule({
  declarations: [AdminProfileComponent, UpdateProfileDialogComponent],
  imports: [CommonModule, AdminProfileRoutingModule, SharedModule, FormsModule],
})

export class AdminProfileModule {}