import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';

// import { provideState } from '@ngrx/store';
// import { provideEffects } from '@ngrx/effects';
// import { authReducer, authReducerFeatureKey } from '../../store/authentication/authentication.reducer';
// import { AuthEffects } from '../../store/authentication/authentication.effect';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,

    // providers: [
    //   provideState({ name: authReducerFeatureKey, reducer: authReducer }),
    //   provideEffects(AuthEffects)
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {}