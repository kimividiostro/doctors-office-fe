import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-my-examinations',
  templateUrl: './my-examinations.component.html',
  styleUrls: ['./my-examinations.component.css']
})
export class MyExaminationsComponent implements OnInit {

  scheduledExaminations = [];
  reports = [];
  selectedReport;

  constructor(
    private authService: AuthService, 
    private patientService: PatientService,
    private router: Router) { }

  ngOnInit(): void {
    if(this.authService.user.role !== 'patient') {
      this.router.navigate(['']);
    }

    this.getScheduledExaminations();
    this.getReports(this.authService.user.data.id);
  }

  getScheduledExaminations() {
    this.patientService.getScheduledExaminations(this.authService.user.data.id).subscribe({
      next: res => this.scheduledExaminations = res.filteredScheduledExaminations,
      error: e => console.log(e)
    });
  }

  cancelScheduledExamination(id: number) {
    this.patientService.cancelScheduledExamination(id).subscribe({
      next: res => this.getScheduledExaminations(),
      error: e => console.log(e)
    })
  }

  getReports(id: number) {
    this.patientService.getReports(id).subscribe({
      next: rep => this.reports = rep.reports,
      error: e => console.log(e)
    })
  }

  selectReport(reportId) {
    this.selectedReport = this.reports.find(report => report.id === reportId)
  }

  isExaminationOver(examDate) {
    return Date.parse(examDate) < Date.now();
  }
}
