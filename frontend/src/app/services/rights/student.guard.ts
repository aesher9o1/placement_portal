import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { DataService } from '../data/data.service';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private _router: Router, private dataService: DataService) { }

  _getCurrentUser() {
    return this.afAuth.auth.currentUser
  }


  canActivate() {
    if (isNullOrUndefined(this._getCurrentUser()))
      return this.defaultAction()
    else
      return this._getCurrentUser().getIdTokenResult().then((idTokenResult) => {
        if (idTokenResult.claims.student) {
          if (idTokenResult.claims.officer)
            return this.goAdmin()
          else return true
        }
        else return this.defaultAction()
      }).catch((error) => {
        return this.defaultAction()
      })
  }

  defaultAction(): boolean {
    this._router.navigate(['/auth'])
    return false;
  }

  goAdmin() {
    this._router.navigate(['/administrator'])
    return false;
  }

  saveData(data) {
    console.log(data)
  }
}
