import { Routes } from '@angular/router';
import {AuthGuard} from './core/auth/auth.guard';

export const routes: Routes = [
  { path: 'demo1', loadComponent: () => import('./features/demo1/demo1'),
    data: { title: 'Hello Demo 1' }
  },
  {
    path: 'demo2',
    loadComponent: () => import('./features/demo2/demo2').then(c => c.Demo2),
    canActivate: [AuthGuard],
  },
  { path: 'demo3', loadComponent: () => import('./features/demo3/demo3').then(c => c.Demo3)},
  { path: 'product/:productId', loadComponent: () => import('./features/product/product')},
  {
    path: 'uikit',
    loadComponent: () => import('./features/uikit/uikit'),
    children: [
      { path:'accordion', loadComponent: () => import('./features/uikit/pages/accordion-demo')},
      { path:'alert', loadComponent: () => import('./features/uikit/pages/alert-demo')},
      { path:'dropdown', loadComponent: () => import('./features/uikit/pages/dropdown-demo')},
      { path:'phone', loadComponent: () => import('./features/uikit/pages/phone-demo')},
      { path:'timeline', loadComponent: () => import('./features/uikit/pages/timeline-demo')},
      { path:'variant-icon', loadComponent: () => import('./features/uikit/pages/variant-icon-demo')},
      { path:'', redirectTo: 'accordion', pathMatch: 'full'}
    ]
  },
  { path: '', redirectTo: 'demo1', pathMatch: 'full' }
];
