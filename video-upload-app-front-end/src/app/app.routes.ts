import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/landing_page/landing.module').then((m) => m.LandingModule),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./pages/login_page/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'register',
        loadChildren: () =>
          import('./pages/register_page/register.module').then((m) => m.RegisterModule),
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./pages/home_page/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'product',
        loadChildren: () =>
          import('./pages/product_page/product.module').then((m) => m.ProductModule),
      },
      { 
        path: '**', redirectTo: '' 
      } // Default redirect to login if no route matches
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}