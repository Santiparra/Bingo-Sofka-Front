import { Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';

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
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'gameboard/:lobbyId',
    loadComponent: () =>
      import('./gameboard/gameboard.component').then((m) => m.GameboardComponent),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/auth/login' },
];
