import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
):  Observable<HttpEvent<unknown>> {
  const token = localStorage.getItem('token')
  const router = inject(Router)
  let cloneReq = req

  if (token) {
    cloneReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    })
  }
  return next(cloneReq)
    .pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          console.log('error', err.status)
          switch (err.status) {
            case 0:
              // do something
              console.log('redirect to login')
              router.navigateByUrl('demo1')
              break;

            case 401:
            case 404:
              // do something
              console.log('redirect to login')
              break;

            //...
          }
        }
        return of(err);
        // return throwError(err);            //se si vuole che l'errore arrivi anche ai componenti
      })
    )

}
