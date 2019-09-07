import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _verify = `${environment.serverURL}${environment.apiVersion.v1}/auth`

  constructor(private http: HttpClient, private afAuth: AngularFireAuth) { }

  verify() {
    return this.http.get(this._verify)
  }

}
