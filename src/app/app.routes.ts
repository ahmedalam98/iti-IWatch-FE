import { Routes } from '@angular/router';
import { canActivate } from './Guards/auth-guard.guard';

export const routes: Routes = [
  // { path: '', component: HomeComponent },
  {
    path: '',
    loadComponent: () =>
      import('./Pages/home/home.component').then((m) => m.HomeComponent),
  },
  // { path: 'movie/:movie-name', component: SingleMovieComponent },
  {
    path: 'movie/:movie-name',
    loadComponent: () =>
      import('./Pages/single-movie/single-movie.component').then(
        (m) => m.SingleMovieComponent
      ),
  },
  // { path: 'sign-up', component: SignUpComponent },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./Pages/sign-up/sign-up.component').then(
        (m) => m.SignUpComponent
      ),
  },
  // { path: 'sign-in', component: SignInComponent },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./Pages/sign-in/sign-in.component').then(
        (m) => m.SignInComponent
      ),
  },
  // { path: 'profile', component: ProfileComponent, canActivate: [canActivate] },
  {
    path: 'profile',
    loadComponent: () =>
      import('./Pages/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
    canActivate: [canActivate],
  },
  // {
  //   path: 'booking/:movie-name',
  //   component: BookingComponent,
  //   canActivate: [canActivate],
  // },
  {
    path: 'booking/:movie-name',
    loadComponent: () =>
      import('./Pages/booking/booking.component').then(
        (m) => m.BookingComponent
      ),
    canActivate: [canActivate],
  },
  // {
  //   path: 'checkout',
  //   component: CheckoutComponent,
  //   canActivate: [canActivate],
  // },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./Pages/checkout/checkout.component').then(
        (m) => m.CheckoutComponent
      ),
    canActivate: [canActivate],
  },
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  //   canActivate: [canActivate],
  // },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./Pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [canActivate],
  },
  // { path: '**', component: ErrorComponent },
  {
    path: '**',
    loadComponent: () =>
      import('./Pages/error/error.component').then((m) => m.ErrorComponent),
  },
];
