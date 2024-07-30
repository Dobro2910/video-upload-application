import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

// Authentication
import { authReducer, authReducerFeatureKey } from './store/authentication/authentication.reducer';
import { AuthEffects } from './store/authentication/authentication.effect';

// Product
import { productReducer, productReducerFeatureKey } from './store/product/product.reducer';
import { ProductEffects } from './store/product/product.effect';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(), 
    provideHttpClient(withFetch()),
    

    provideStore({[authReducerFeatureKey]: authReducer, [productReducerFeatureKey]: productReducer}),
    provideEffects(AuthEffects, ProductEffects)
  ]
};
