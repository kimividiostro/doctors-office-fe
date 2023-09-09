import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctor-reports',
  templateUrl: './doctor-reports.component.html',
  styleUrls: ['./doctor-reports.component.css']
})
export class DoctorReportsComponent implements OnInit {

  patientId: number;
  reports = [];
  constructor(private doctorService: DoctorService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({next: params => {
      this.patientId = params['id'];
      this.getPatientReports(this.patientId)
    }});
  }

  getPatientReports(patientId: number) {
    this.doctorService.getReportsForPatient(patientId).subscribe({
      next: res => this.reports = res.reports
    })
  }
}
