import { Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'auth/sign-up',
    loadComponent: () =>
      import('./auth/signup/signup.component').then((m) => m.SignupComponent),
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: '/auth/login' },
];
