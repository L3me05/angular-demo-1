import {inject} from '@angular/core';
import {Router} from '@angular/router';

export const AuthGuard = () => {
  const router = inject(Router)
  const isLogged = true;
  if(!isLogged) {
    router.navigateByUrl('demo1')
  }
  return isLogged;
}
