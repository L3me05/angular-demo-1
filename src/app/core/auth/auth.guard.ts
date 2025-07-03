import {inject} from '@angular/core';
import {Router} from '@angular/router';

export const AuthGuard = () => {
  const router = inject(Router)
  const isLogged = false;
  if(!isLogged) {
    router.navigateByUrl('demo1')
  }
  return isLogged;
}
