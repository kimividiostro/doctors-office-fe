import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form-admin',
  templateUrl: './login-form-admin.component.html',
  styleUrls: ['./login-form-admin.component.css']
})
export class LoginFormAdminComponent {

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  
  message = {msg: ''};

  onSubmit():void {
    this.authService.login('manager', this.loginForm.value.username, this.loginForm.value.password, this.message);
  }

}
