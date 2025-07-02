import { Routes } from '@angular/router';
import {Demo1} from './features/demo1/demo1';
import {Demo2} from './features/demo2/demo2';
import {Demo3} from './features/demo3/demo3';

export const routes: Routes = [
  { path: 'demo1', component: Demo1 },
  { path: 'demo2', component: Demo2 },
  { path: 'demo3', component: Demo3},
  { path: '', redirectTo: 'demo1', pathMatch: 'full' }
];
