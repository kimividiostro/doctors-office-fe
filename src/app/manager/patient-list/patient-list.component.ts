import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatchValidator, passwordRegex } from 'src/app/global';
import { Patient } from 'src/app/models/patient';
import { AuthService } from 'src/app/services/auth.service';
import { ManagerService } from 'src/app/services/manager.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  patients: Patient[];
  selectedPatient = null;
  imageBase64;
  message = '';

  updatePatientForm = this.fb.group({
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

  constructor(
    private managerService: ManagerService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private patientService: PatientService) { }

  ngOnInit(): void {
    if(this.authService.user.role !== 'manager') {
      this.router.navigate(['']);
    }
    this.getPatients();
  }
  
  getPatients() {
    this.managerService.getPatients().subscribe({
      next: patients => this.patients = patients,
      error: e => console.log(e) // TODO: add error handling
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
            // TODO: add error message
          }
        else {
          this.updatePatientForm.controls.image.setErrors(null);
          const reader = new FileReader();
          reader.readAsDataURL(filePath);
          reader.onload = () => {
            this.imageBase64 = reader.result;
          }
        }
      }
    }
  }

  onEdit(patient) {
    this.selectedPatient = patient;
    const { firstName, lastName, userName, address, phone, email } = this.selectedPatient;
    this.updatePatientForm.patchValue({
      firstName,
      lastName,
      userName,
      address,
      phone,
      email
    });
  }

  updatePatient() {
    if(this.updatePatientForm.valid) {
      const { firstName, lastName, userName, address, phone, email, password } = this.updatePatientForm.value;
      const patient = {
        firstName,
        lastName,
        userName,
        address,
        phone,
        email,
        password,
        profilePic: this.imageBase64 || this.selectedPatient.profilePic
      };

      this.patientService.updatePatient(this.selectedPatient.id, patient).subscribe({
        next: res => {
          this.message = 'Successfully updated';
          setTimeout(() => this.message = '', 3000);
          this.getPatients();
        },
        error: e => console.log(e)
      });
    }
  }

  deletePatient() {
    this.patientService.deletePatient(this.selectedPatient.id).subscribe({
      next: res => {
        this.message = 'Patient successfully deleted';
        setTimeout(() => this.message = '', 3000);
        this.getPatients();
      }
    });
  }
}
