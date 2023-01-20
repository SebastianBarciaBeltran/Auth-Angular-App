import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {


  public loginForm : FormGroup = this._fb.group({
    email: ['Test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required]
  });

  constructor(private _fb: FormBuilder, private _router: Router) { }

  ngOnInit(): void {

  }

  login(){
    console.log(this.loginForm.value)
    this._router.navigateByUrl('/dashboard');
  }
}
