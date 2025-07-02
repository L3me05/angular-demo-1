import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'demo1', loadComponent: () => import('./features/demo1/demo1'),
    data: { title: 'Hello Demo 1' }
  },
  { path: 'demo2', loadComponent: () => import('./features/demo2/demo2').then(c => c.Demo2) },
  { path: 'demo3', loadComponent: () => import('./features/demo3/demo3').then(c => c.Demo3)},
  { path: 'product/:productId', loadComponent: () => import('./features/product/product')},
  { path: '', redirectTo: 'demo1', pathMatch: 'full' }
];
