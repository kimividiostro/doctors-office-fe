import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form-user',
  templateUrl: './login-form-user.component.html',
  styleUrls: ['./login-form-user.component.css']
})
export class LoginFormUserComponent {

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}
  
  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })
  

  onSubmit():void {
    if(this.authService.login(this.loginForm.value)){
      this.router.navigate(['home']);
    }
  }
}
