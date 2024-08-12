import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerProfileComponent } from './seller_profile.component';
import { AuthGuard } from '../../guard/auth.guard';
import { UserRole } from '../../store/model/user.model';

const routes: Routes = [
  {
    path: '',
    component: SellerProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRole.Seller] } // Only allow access to verify Account
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerProfileRoutingModule {}