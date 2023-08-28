import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Doctor } from 'src/app/models/doctor';
import { Specialization } from 'src/app/models/specialization';
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
  passwordRegex = /^(?!.*(.)\1)(?=.*[!@#$%^&*()\-_=+<>\?])(?=[A-Za-z])(?=.*[A-Z])(?=.*\d).{8,14}$/;

  addDoctorForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(this.passwordRegex)]],
    licenceNumber: ['', Validators.required],
    officeDepartment: ['', Validators.required],
    specialization: ['', Validators.required],
    image: ['', Validators.required]
  })
  constructor(private doctorService: DoctorService, private fb: FormBuilder, private managerService: ManagerService) { }

  ngOnInit(): void {
    this.getDoctors();
    this.getSpecializations();
  }

  getDoctors() {
    this.doctorService.getDoctors().subscribe(
      res => this.doctors = res.doctors
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
        }
      }
    }
  }

  addNewDoctor() {
    if(this.addDoctorForm.valid) {

    }
  }

  getSpecializations() {
    this.managerService.getSpecializations().subscribe(
      res => this.specializations = res.specializations
    )
  }
}
