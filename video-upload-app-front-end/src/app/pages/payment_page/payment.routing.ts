import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './payment.component';
import { AuthGuard } from '../../guard/auth.guard';
import { UserRole } from '../../store/model/user.model';

const routes: Routes = [
  {
    path: '',
    component: PaymentComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRole.Admin, UserRole.Seller, UserRole.User] } // Only allow access to verify Account
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule {}