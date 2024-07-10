import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import this for animations

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { authReducer } from '../app/store/authentication/authentication.reducer';
import { AuthEffects } from '../app/store/authentication/authentication.effect';

// import { provideStore } from '@ngrx/store';
// import { provideEffects } from '@ngrx/effects';
// import { LoginModule } from './pages/login_page/login.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // StoreModule.forRoot({}),
    // EffectsModule.forRoot([]),
    // LoginModule,
    StoreModule.forRoot({auth:authReducer}),
    EffectsModule.forRoot(AuthEffects),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
