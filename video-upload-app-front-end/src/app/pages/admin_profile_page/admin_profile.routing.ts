import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProfileComponent } from './admin_profile.component';
import { AuthGuard } from '../../guard/auth.guard';
import { UserRole } from '../../store/model/user.model';

const routes: Routes = [
  {
    path: '',
    component: AdminProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRole.Admin] } // Only allow access to verify Account
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminProfileRoutingModule {}