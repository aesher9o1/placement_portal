import { Component, OnInit, OnDestroy } from '@angular/core';
import 'typed.js';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
declare var Typed: any;


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {


  isComponentActive: boolean = true

  constructor(private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.afAuth.authState.pipe(takeWhile(() => this.isComponentActive)).subscribe(res => {
      if (res)
        this.router.navigate([''])
    })


    let options = {
      strings: ["Innovate.", "Create.", "Dictate.", "Code."],
      typeSpeed: 100,
      backSpeed: 100,
      showCursor: true,
      cursorChar: "|",
      loop: true
    }
    new Typed(".typing-element", options);
  }

  ngOnDestroy() {
    this.isComponentActive = false;
  }



}
