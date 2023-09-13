import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatchValidator, passwordRegex } from 'src/app/global';
import { Doctor } from 'src/app/models/doctor';
import { Specialization } from 'src/app/models/specialization';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  doctors: Doctor[];
  specializations: Specialization[];
  imageBase64: string | ArrayBuffer;

  addDoctorForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    userName: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(passwordRegex)]],
    password2: ['', [Validators.required, Validators.pattern(passwordRegex)]],
    licenceNumber: ['', Validators.required],
    officeDepartment: ['', Validators.required],
    specialization: ['', Validators.required],
    image: ['', Validators.required]
  }, {validators: passwordMatchValidator});
  constructor(
    private doctorService: DoctorService, 
    private fb: FormBuilder, 
    private managerService: ManagerService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    if(this.authService.user.role !== 'manager') {
      this.router.navigate(['']);
    }
    this.getDoctors();
    this.getSpecializations();
  }

  getDoctors() {
    this.doctorService.getDoctors().subscribe(
      res => this.doctors = res.doctors
    )
  }

  getSpecializations() {
    this.managerService.getSpecializations().subscribe(
      res => this.specializations = res.specializations
    )
  }

  onFileSelected(event) {
    const filePath = event.target.files[0];
    if(filePath) {
      const image = new Image();
      image.src = window.URL.createObjectURL(filePath);
      image.onload = () => {
        if(image.width < 100 || image.height < 100
          || image.width > 300 || image.height > 300){
            this.addDoctorForm.controls.image.setErrors({incorrect: true});
          }
        else {
          this.addDoctorForm.controls.image.setErrors(null);
          const reader = new FileReader();
          reader.readAsDataURL(filePath);
          reader.onload = () => {
            this.imageBase64 = reader.result;
          }
        }
      }
    }
  }

  addNewDoctor() {
    if(this.addDoctorForm.valid) {
      const { 
        firstName, 
        lastName, 
        userName, 
        password, 
        address, 
        phone, 
        email, 
        licenceNumber, 
        officeDepartment, 
        specialization } = this.addDoctorForm.value; 
      const doctor = {
        firstName,
        lastName,
        userName,
        password,
        address,
        phone,
        email,
        licenceNumber,
        officeDepartment,
        specialization,
        profilePic: this.imageBase64
      };
      this.doctorService.addDoctor(doctor).subscribe({
        next: () => {
          this.getDoctors();
          this.addDoctorForm.reset();
        },
        error: e => {
          // TODO: add error handling
          console.log(e);
        }
      })
    }
  }

  

}
