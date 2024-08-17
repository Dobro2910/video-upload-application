import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PaymentComponent } from "./payment.component";
import { PaymentRoutingModule } from "./payment.routing";
import { SharedModule } from "../shared/shared.module";
import { PaymentDialogComponent } from "./payment_dialog/payment_dialog.component";

@NgModule({
  declarations: [PaymentComponent, PaymentDialogComponent],
  imports: [CommonModule, SharedModule, PaymentRoutingModule],
})

export class PaymentModule {}