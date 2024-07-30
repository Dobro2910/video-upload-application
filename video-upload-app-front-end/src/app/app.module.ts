import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import this for animations
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Authentication
import { authReducer } from '../app/store/authentication/authentication.reducer';
import { AuthEffects } from '../app/store/authentication/authentication.effect';

// Product
import { productReducer } from './store/product/product.reducer';
import { ProductEffects } from './store/product/product.effect';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    StoreModule.forRoot({auth:authReducer, product:productReducer}),
    EffectsModule.forRoot([AuthEffects, ProductEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
