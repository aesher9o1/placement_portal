import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"), Validators.required]],
      password: ['', [Validators.minLength(5), Validators.required]],
      name: ['', [Validators.minLength(5), Validators.required]],
      rid: ['', [Validators.minLength(8), Validators.required]]
    })
  }

  register() {

  }
  login() {
    this.router.navigate(['/auth'])
  }
}
