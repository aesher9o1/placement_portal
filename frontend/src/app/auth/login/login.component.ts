import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(public afAuth: AngularFireAuth, private _fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router, private authService: AuthService) { }

  ngOnInit() {

    this.loginForm = this._fb.group({
      email: ['', [Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"), Validators.required]],
      password: ['', [Validators.minLength(5), Validators.required]]
    })
  }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.value["email"], this.loginForm.value["password"]).then(res => {
      res.user.getIdToken().then(res => {
        this.authService.verify({ uid: res })
      })
    }, err => {
      this._snackBar.open(err.message, "Retry", { duration: 2000, verticalPosition: "top" })
    })
  }

  register() {
    this.router.navigate(['/auth/register'])
  }

  isEmailInvalid(): boolean {
    return this.loginForm.get("email").valid
  }

  isPasswordValid(): boolean {
    return this.loginForm.get("password").valid
  }

}
