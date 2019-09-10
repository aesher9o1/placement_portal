import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { DataService } from './data/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _router: Router, private afAuth: AngularFireAuth) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.afAuth.authState.pipe(
      map(user => {
        if (user) 
          return true;
        
        else
          this.defaultBehavior()
      })
    )
  }

  defaultBehavior(): boolean {
    this._router.navigate(['/auth'])
    return false;
  }



}
