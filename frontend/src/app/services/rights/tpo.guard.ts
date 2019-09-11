import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class TpoGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  _getCurrentUser() {
    return this.afAuth.auth.currentUser
  }


  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    if (isNullOrUndefined(this._getCurrentUser()))
      return this.defaultBehavior()
    else
      return this._getCurrentUser().getIdTokenResult().then((idTokenResult) => {
        if (idTokenResult.claims.admin)
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
