import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
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
  
  constructor(
    private authService: AuthService, 
    private doctorService: DoctorService, 
    private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.doctorService.getExaminationsByDoctor(this.doctor.id).subscribe({
      next: exams => this.selectedExaminations = exams,
      error: error => console.log(error) //TODO: add error handling
    });
    this.doctorService.getExaminationsBySpecialization(this.doctor.specialization.id).subscribe({
      next: exams => {
        this.examinationsBySpecialization = exams;
        this.examinationsBySpecialization.forEach(exam => {
          exam['checked'] = false;
        })
      },
      error: e => console.log(e) // TODO: add error handling
    });
  }

  getFormControls() {
    return (this.examinationsForm.get('examinations') as FormArray).controls;
  }

  submit() {
    const checkedExaminations = this.examinationsBySpecialization.filter(exam => exam.checked);
    if(checkedExaminations.length === 0) {
      // TODO: add error message
      return;
    }
    this.doctorService.sendExaminationRequest(this.doctor.id, checkedExaminations).subscribe({
      next: res => this.message = 'Request sent.', // TODO: add success message and exit form
      error: e => this.message = 'Something went wrong.' // TODO: add error message
    });
  }

}
