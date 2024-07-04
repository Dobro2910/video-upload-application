import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginRoutingModule } from "./login.routing";
import { LoginComponent } from "./login.component";

// Import Angular Material modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthenticationService } from "../../service/authentication.service";

import { authReducerFeatureKey, authReducer } from '../../store/authentication/authentication.reducer';
import { AuthEffects } from '../../store/authentication/authentication.effect';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule, 
    LoginRoutingModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    StoreModule.forFeature(authReducerFeatureKey, authReducer), 
    EffectsModule.forFeature(AuthEffects)
  ],
  providers: [AuthenticationService],
})
export class LoginModule {}
