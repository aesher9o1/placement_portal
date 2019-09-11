import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { takeWhile, takeUntil, first, take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup
  isComponentActive: boolean = true

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"), Validators.required]],
      password: ['', [Validators.minLength(5), Validators.required]],
      displayName: ['', [Validators.minLength(5), Validators.required]],
      rid: ['', [Validators.minLength(8), Validators.required]]
    })
  }

  ngOnDestroy() {
    this.isComponentActive = false;
  }

  register() {
    this.auth.register(this.registerForm.value).pipe(take(1)).subscribe(res => {
      this.snackBar.open(res['message'], "Success", { duration: 2000, verticalPosition: "top" })
    }, err => {
      this.snackBar.open(err["message"], "Retry", { duration: 2000, verticalPosition: "top" })
    })

  }

  login() {
    this.router.navigate(['/auth'])
  }
}
