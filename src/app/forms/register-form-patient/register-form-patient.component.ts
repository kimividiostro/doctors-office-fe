import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator, passwordRegex } from 'src/app/global';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-register-form-patient',
  templateUrl: './register-form-patient.component.html',
  styleUrls: ['./register-form-patient.component.css']
})
export class RegisterFormPatientComponent implements OnInit {

  message = '';
  imageBase64: string | ArrayBuffer;
  registerPatientForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    userName: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(passwordRegex)]],
    password2: ['', [Validators.required, Validators.pattern(passwordRegex)]],
    image: ['']
  }, {validators: passwordMatchValidator});

  constructor(private fb: FormBuilder, private patientService: PatientService, private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('/assets/images/default-avatar.png', { responseType: 'blob' })
      .subscribe(res => {
        const reader = new FileReader();
        reader.readAsDataURL(res); 
        reader.onloadend = () => {
          this.imageBase64 = reader.result;
        }
      });
  }

  onFileSelected(event) {
    const filePath = event.target.files[0];
    if(filePath) {
      const image = new Image();
      image.src = window.URL.createObjectURL(filePath);
      image.onload = () => {
        if(image.width < 100 || image.height < 100
          || image.width > 300 || image.height > 300){
            this.message = 'Invalid image resolution. Default avatar will be used.';
            setTimeout(() => {
              this.message = '';
            }, 3000);
          }
        else {
          this.registerPatientForm.controls.image.setErrors(null);
          const reader = new FileReader();
          reader.readAsDataURL(filePath);
          reader.onload = () => {
            this.imageBase64 = reader.result;
          }
        }
      }
    }
  }

  registerPatient() {
    if(this.registerPatientForm.valid) {
      const user = {
        userName: this.registerPatientForm.value.userName,
        password: this.registerPatientForm.value.password,
        firstName: this.registerPatientForm.value.firstName,
        lastName: this.registerPatientForm.value.lastName,
        address: this.registerPatientForm.value.address,
        phone: this.registerPatientForm.value.phone,
        email: this.registerPatientForm.value.email,
        profilePic: this.imageBase64
      };

      this.patientService.registerPatient(user).subscribe({
        next: () => {
          this.registerPatientForm.reset();
          this.message = 'Registration pending.';
        },
        error: e => {
          this.message = e.error.msg;
          setTimeout(() => {
            this.message = '';
          }, 3000)
        }
      });
    }
  }
}
