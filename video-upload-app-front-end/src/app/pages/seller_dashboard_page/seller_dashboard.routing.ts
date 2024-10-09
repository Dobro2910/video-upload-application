import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guard/auth.guard';
import { UserRole } from '../../store/model/user.model';
import { SellerDashboardComponent } from './seller_dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: SellerDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRole.Admin, UserRole.Seller] } // Only allow access to verify Account
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SellerDashboardRoutingModule {}