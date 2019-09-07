import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http'
import { FirebaseAuth } from '@angular/fire';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private afAuth: AngularFireAuth, private injector: Injector) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {



    return from(this.afAuth.auth.currentUser.getIdToken())
      .pipe(
        switchMap(token => {
          const headers = req.headers
            .set('authorization', token.toString())
            .append('Content-Type', 'application/json')
            .append('uid', this.afAuth.auth.currentUser.uid.toString());

          return next.handle(req.clone({ headers }));
        })
      );

  }
}
