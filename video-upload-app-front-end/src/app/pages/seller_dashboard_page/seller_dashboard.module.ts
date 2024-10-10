import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { SellerDashboardComponent } from "./seller_dashboard.component";
import { SellerDashboardRoutingModule } from "./seller_dashboard.routing";
import { SellerDashboardDialogComponent } from "./seller_dashboard_dialog/seller_dashboard_dialog.component";
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [SellerDashboardComponent, SellerDashboardDialogComponent],
  imports: [CommonModule, SellerDashboardRoutingModule, SharedModule, MatDialogModule],
})

export class SellerDashboardModule {}