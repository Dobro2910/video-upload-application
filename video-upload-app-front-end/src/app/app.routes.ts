import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/landing_page/landing.module').then((m) => m.LandingModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login_page/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register_page/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home_page/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'product',
    loadChildren: () => import('./pages/product_page/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'payment',
    loadChildren: () => import('./pages/payment_page/payment.module').then((m) => m.PaymentModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/user_profile_page/user_profile.module').then((m) => m.UserProfileModule),
  },
  {
    path: '**', redirectTo: ''
  }, // Default redirect to landing page if no route matches
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}