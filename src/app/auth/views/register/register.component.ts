import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  public registerForm : FormGroup = this._fb.group({
    name: ['Test1', Validators.required],
    email: ['Test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required]
  });


  constructor(private _fb: FormBuilder, private _router: Router) { }

  ngOnInit(): void {
  }

  register(){
    console.log(this.registerForm.value);
    this._router.navigateByUrl('/dashboard');
  }
}
