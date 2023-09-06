import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctor-view',
  templateUrl: './doctor-view.component.html',
  styleUrls: ['./doctor-view.component.css']
})
export class DoctorViewComponent implements OnInit {
  doctor: Doctor;
  examinations: any; // TODO: create model

  constructor(private route: ActivatedRoute, private router: Router, private doctorService: DoctorService) { }

  ngOnInit(): void {
    const doctorId = +this.route.params['_value']['id'];
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

}
