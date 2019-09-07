import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHeaders } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }
  intercept(req, next) {
      let toenizedReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      })
      return next.handle(toenizedReq)
  }
}
