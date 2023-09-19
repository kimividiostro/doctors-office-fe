import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-doctor-view',
  templateUrl: './doctor-view.component.html',
  styleUrls: ['./doctor-view.component.css']
})
export class DoctorViewComponent implements OnInit {
  doctor: Doctor;
  examinations: any; // TODO: create model
  selectedExamination;
  scheduleExaminationForm = this.fb.group({
    date: ['', Validators.required],
    time: ['', Validators.required],
    reasonForComing: ['', Validators.required]
  });
  message = '';

  constructor(
    private doctorService: DoctorService,
    private fb: FormBuilder,
    private authService: AuthService,
    private patientService: PatientService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if(this.authService.user.role !== 'patient') {
      this.router.navigate(['']);
    }

    this.activatedRoute.params.subscribe({
      next: par => {
        const doctorId = par['id'];
        this.doctorService.getDoctor(doctorId).subscribe({
          next: doc => {
            this.doctor = doc.doctor;
            this.doctorService.getExaminationsByDoctor(doctorId).subscribe({
              next: examinations => this.examinations = examinations,
              error: e => {
              }
            });
          },
          error: e => {
            this.router.navigate(['**']);
          }
        }); 
      }
    })
  }

  scheduleExamination() {
    const { reasonForComing, date, time } = this.scheduleExaminationForm.value;
    if(new Date(`${date} ${time}`) < new Date()) {
      this.message = 'Invalid date or time.';
      setTimeout(() => {
        this.message = '';
      }, 3000);
      return;
    }

    const [hours, minutes] = time.split(':');

    const st = new Date();
    st.setHours(+hours);
    st.setMinutes(+minutes);

    const endTime = new Date();
    endTime.setHours(+hours);
    endTime.setMinutes(st.getMinutes() + this.selectedExamination.durationInMinutes);

    const patient = this.authService.user.data;
    this.patientService.scheduleExamination(
      reasonForComing,
      date,
      time,
      endTime.toTimeString().slice(0,5),
      this.doctor.id,
      patient.id,
      this.selectedExamination
    ).subscribe({
      next: res => {
        this.message = 'Successfully scheduled!'
        setTimeout(() => {
          this.message = '';
        }, 3000);
        this.scheduleExaminationForm.reset();
      },
      error: e => {
        this.message = e.error.msg
        setTimeout(() => {
          this.message = '';
        }, 3000);
      }
    });

  }
}
