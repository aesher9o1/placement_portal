import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _claim = new BehaviorSubject({
    admin: false,
    officer: false,
    student: false
  })

  private _currentUser = new BehaviorSubject(null)
  currentUser = this._currentUser.asObservable();

  constructor() { }



  public setCurrentUser(data) {
    this._currentUser.next(data)
  }
}
