import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form-user',
  templateUrl: './login-form-user.component.html',
  styleUrls: ['./login-form-user.component.css']
})
export class LoginFormUserComponent {

  constructor(private formBuilder: FormBuilder) {}
  
  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })
  

  onSubmit():void {
    
  }
}
