import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'home', loadComponent: () => import('./features/home/home') },
    { path: 'cart', loadComponent: () => import('./features/cart/cart') },
    { path: 'settings', loadComponent: () => import('./features/settings/settings') },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];
