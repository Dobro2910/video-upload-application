import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PaymentComponent } from "./payment.component";
import { PaymentRoutingModule } from "./payment.routing";
import { SharedModule } from "../shared/shared.moduel";

@NgModule({
  declarations: [PaymentComponent],
  imports: [CommonModule, SharedModule, PaymentRoutingModule],
})

export class PaymentModule {}