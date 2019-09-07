import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http'
import { FirebaseAuth } from '@angular/fire';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private afAuth: AngularFireAuth) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return from(this.afAuth.auth.currentUser.getIdToken())
      .pipe(
        switchMap(token => {
          let toenizedReq = req.clone({
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'authorization': token.toString(),
              'uid': this.afAuth.auth.currentUser.uid.toString()
            })
          })
          console.log(toenizedReq )
          return next.handle(toenizedReq);
        })
      );

  }
}
