import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools'; // Import for Redux DevTools
import { environment } from '../environment'; // Import environment configuration

// Authentication
import { authReducer, authReducerFeatureKey } from './store/authentication/authentication.reducer';
import { AuthEffects } from './store/authentication/authentication.effect';

// Payment
import { paymentReducer, paymentReducerFeatureKey } from './store/payment/payment.reducer';
import { PaymentEffects } from './store/payment/payment.effect';

// Product
import { productReducer, productReducerFeatureKey } from './store/product/product.reducer';
import { ProductEffects } from './store/product/product.effect';

// Shopping Cart
import { shoppingCartReducer, shoppingCartReducerFeatureKey } from './store/shopping_cart/shopping_cart.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(), 
    provideHttpClient(withFetch()),
    

    provideStore({[authReducerFeatureKey]: authReducer, [productReducerFeatureKey]: productReducer, [paymentReducerFeatureKey]: paymentReducer, [shoppingCartReducerFeatureKey]: shoppingCartReducer}),
    provideEffects(AuthEffects, ProductEffects, PaymentEffects),

    // Provide Redux DevTools
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode in production
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: true, // Enable trace feature
      traceLimit: 1000, // Optionally set the maximum stack trace steps
    }),
  ]
};
