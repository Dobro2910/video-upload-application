import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { SellerDashboardComponent } from "./seller_dashboard.component";
import { SellerDashboardRoutingModule } from "./seller_dashboard.routing";

@NgModule({
  declarations: [SellerDashboardComponent],
  imports: [CommonModule, SellerDashboardRoutingModule, SharedModule],
})

export class SellerDashboardModule {}