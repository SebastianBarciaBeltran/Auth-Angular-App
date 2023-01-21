import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  public registerForm : FormGroup = this._fb.group({
    name: ['Test2', Validators.required],
    email: ['Test2@test.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required]
  });


  constructor(private _fb: FormBuilder, private _router: Router, private _authService: AuthService) { }

  ngOnInit(): void {
  }

  register(){
    const {name, email, password } = this.registerForm.value;
    if (this.registerForm.valid) {

      this._authService.register(name, email, password)
          .subscribe( (response) => {
              if (response === true ) {
                this._router.navigateByUrl('/dashboard');
              } else {
                Swal.fire('Error', response, 'error');
              }
          });
    }

  }
}
