import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    duration: ['', Validators.required],
    price: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private doctorService: DoctorService) { }

  ngOnInit(): void {
  }

  requestExamination() {
    if(this.newExaminationForm.valid) {
      const { type, price, duration } = this.newExaminationForm.value;
      const specialization = this.doctor.specialization;
      const examination: Examination = {
        type,
        duration,
        price: +price,
        specialization
      };

      this.doctorService.requestNewExamination(examination).subscribe({
        next: res => this.newExaminationForm.reset(), // TODO: add messages
        error: e => console.log(e)
      })
    }
  }
}
