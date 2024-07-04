import { NgModule, ErrorHandler  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import this for animations

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// import { LoginModule } from './pages/login_page/login.module';

// import { authReducer } from '../app/store/authentication/authentication.reducer';
// import { AuthEffects } from '../app/store/authentication/authentication.effect';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    // StoreModule.forRoot({auth:authReducer}),
    // EffectsModule.forRoot(AuthEffects),
    // LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
