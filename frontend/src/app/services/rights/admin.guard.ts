import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { DataService } from '../data/data.service';
import { isNullOrUndefined } from 'util';
import { map, first, switchMap, takeWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth,private router: Router) { }

  _getCurrentUser() {
    return this.afAuth.auth.currentUser
  }


  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    if (isNullOrUndefined(this._getCurrentUser()))
      return this.defaultBehavior()
    else
      return this._getCurrentUser().getIdTokenResult().then((idTokenResult) => {
        if (idTokenResult.claims.officer)
          return true
        else
          return this.goStudent()
      }).catch((error) => {
        return this.defaultBehavior()
      })







  }

  defaultBehavior(): boolean {
    this.router.navigate(['/auth'])
    return false;
  }

  goStudent() {
    this.router.navigate(['/dashboard'])
    return false;
  }
}
