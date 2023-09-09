import { AbstractControl, ValidationErrors } from "@angular/forms";

export const passwordRegex = /^(?!.*(.)\1)(?=.*[!@#$%^&*()\-_=+<>\?])(?=[A-Za-z])(?=.*[A-Z])(?=.*\d).{8,14}$/;

export const passwordMatchValidator = (control: AbstractControl): ValidationErrors | null  => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('password2')?.value;

    return password === confirmPassword ? null : { passwordsDoNotMatch: true };
  }