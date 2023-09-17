import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor';
import { Examination } from 'src/app/models/examination';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctor-other',
  templateUrl: './doctor-other.component.html',
  styleUrls: ['./doctor-other.component.css']
})
export class DoctorOtherComponent implements OnInit {
  doctor = this.authService.user.data as Doctor;
  newExaminationForm = this.fb.group({
    type: ['', Validators.required],
    durationInMinutes: [''],
    price: ['', Validators.required]
  });
  message = '';

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private doctorService: DoctorService,
    private router: Router) { }

  ngOnInit(): void {
    if(this.authService.user.role !== 'doctor') {
      this.router.navigate(['']);
    }
  }

  requestExamination() {
    if(this.newExaminationForm.valid) {
      const { type, price, durationInMinutes } = this.newExaminationForm.value;
      const specialization = this.doctor.specialization;
      const examination: Examination = {
        type,
        durationInMinutes: +durationInMinutes,
        price: +price,
        specialization,
        isPendingApproval: true
      };

      this.doctorService.requestNewExamination(examination).subscribe({
        next: res => {
          this.newExaminationForm.reset();
          this.message = 'Successfully requested.';
          setTimeout(() => {
            this.message = '';
          }, 3000);
        },
        error: e => {
          this.message = 'Something went wrong. Please try again later';
          setTimeout(() => {
            this.message = '';
          }, 3000)
        }
      })
    }
  }
}
