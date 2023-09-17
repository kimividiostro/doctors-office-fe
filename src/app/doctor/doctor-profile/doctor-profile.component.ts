import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor';
import { Examination } from 'src/app/models/examination';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {
  doctor = this.authService.user.data as Doctor;
  selectedExaminations: Examination[];
  examinationsBySpecialization;
  examinationsForm = this.fb.group({
    examinations: new FormArray([])
  });
  message = '';
  modalMessage = '';
  
  constructor(
    private authService: AuthService, 
    private doctorService: DoctorService, 
    private fb: FormBuilder,
    private router: Router) { }
  
  ngOnInit(): void {
    if(this.authService.user.role !== 'doctor') {
      this.router.navigate(['']);
    }

    this.doctorService.getExaminationsByDoctor(this.doctor.id).subscribe({
      next: exams => this.selectedExaminations = exams,
      error: error => this.message = 'Something went wrong while fetching data.'
    });
    this.doctorService.getExaminationsBySpecialization(this.doctor.specialization.id).subscribe({
      next: exams => {
        this.examinationsBySpecialization = exams;
        this.examinationsBySpecialization.forEach(exam => {
          exam['checked'] = false;
        })
      },
      error: e => this.message = 'Something went wrong while fetching data.'
    });
  }

  getFormControls() {
    return (this.examinationsForm.get('examinations') as FormArray).controls;
  }

  submit() {
    const checkedExaminations = this.examinationsBySpecialization.filter(exam => exam.checked);
    if(checkedExaminations.length === 0) {
      this.modalMessage = 'You must select at least one examination.';
      setTimeout(() => {
        this.modalMessage = '';
      }, 3000);
      return;
    }
    this.doctorService.sendExaminationRequest(this.doctor.id, checkedExaminations).subscribe({
      next: res => {
        this.modalMessage = 'Request sent.';
        setTimeout(() => {
          this.modalMessage = '';
        }, 3000);
      },
      error: e => {
        this.modalMessage = 'Something went wrong.';
        setTimeout(() => {
          this.modalMessage = '';
        }, 3000);
      }
    });
  }

}
