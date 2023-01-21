import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal  from "sweetalert2";

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

  constructor(private _fb: FormBuilder, private _router: Router, private _authService: AuthService) { }

  ngOnInit(): void {

  }

  login(){
    if (this.loginForm.valid) {
      const {email, password } = this.loginForm.value;
       
      this._authService.login(email, password).subscribe( ( response ) => {
        if (response === true) {
          this._router.navigateByUrl('/dashboard');
        } else {
          Swal.fire('Error', response, 'error');
        }
      });
    }
    
  }
}
