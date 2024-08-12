import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user_profile.component';
import { AuthGuard } from '../../guard/auth.guard';
import { UserRole } from '../../store/model/user.model';

const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRole.User] } // Only allow access to verify Account
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule {}