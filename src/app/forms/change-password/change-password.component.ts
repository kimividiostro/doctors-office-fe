import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator, passwordRegex } from 'src/app/global';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  changePasswordForm = this.fb.group({
    currentPassword: ['', Validators.required],
    password: ['', [Validators.required, Validators.pattern(passwordRegex)]],
    password2: ['', [Validators.required, Validators.pattern(passwordRegex)]]
  }, {validators: passwordMatchValidator});

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  onSubmit() {
    if(this.changePasswordForm.valid) {
      this.authService.changePassword(
        this.changePasswordForm.value.currentPassword,
        this.changePasswordForm.value.password,
        this.changePasswordForm.value.password2
      ).subscribe({
        next: res => {
          this.authService.logOut();
        }
      })
    }
  }
}
