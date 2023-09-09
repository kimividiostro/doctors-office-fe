import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private doctorService: DoctorService,
    private fb: FormBuilder,
    private authService: AuthService,
    private patientService: PatientService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: par => {
        const doctorId = par['id'];
        this.doctorService.getDoctor(doctorId).subscribe({
          next: doc => {
            // TODO: add guard if doctor with id is not found
            this.doctor = doc.doctor;
            this.doctorService.getExaminationsByDoctor(doctorId).subscribe({
              next: examinations => this.examinations = examinations,
              error: e => { // TODO: add error handling
              }
            });
          },
          error: e => {
            // TODO: add error handling
          }
        }); 
      }
    })
  }

  scheduleExamination() {
    const { reasonForComing, date, time } = this.scheduleExaminationForm.value;
    const patient = this.authService.user.data;
    this.patientService.scheduleExamination(
      reasonForComing,
      date,
      time,
      this.doctor,
      patient,
      this.selectedExamination
    ).subscribe({
      next: res => console.log('YES'),
      error: e => console.log('NO')
    })
  }
}
