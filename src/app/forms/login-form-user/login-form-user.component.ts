import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form-user',
  templateUrl: './login-form-user.component.html',
  styleUrls: ['./login-form-user.component.css']
})
export class LoginFormUserComponent {

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}
  
  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    role: ['', Validators.required],
  });
  
  message = {msg: ''};

  onSubmit():void {
    if(this.loginForm.valid){
      if(this.loginForm.value.role === 'patient') {
        this.authService.login('patient', this.loginForm.value.username, this.loginForm.value.password, this.message);
      }
      else if(this.loginForm.value.role === 'doctor') {
        this.authService.login('doctor', this.loginForm.value.username, this.loginForm.value.password, this.message);
      }
    }
  }
}
