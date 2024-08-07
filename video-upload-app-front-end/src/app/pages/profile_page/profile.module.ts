import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileComponent } from "./profile.component";
import { ProfileRoutingModule } from "./profile.routing";
// import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, ProfileRoutingModule],
})

export class ProfileModule {}