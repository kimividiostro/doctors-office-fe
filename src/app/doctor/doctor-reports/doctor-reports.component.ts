import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-doctor-reports',
  templateUrl: './doctor-reports.component.html',
  styleUrls: ['./doctor-reports.component.css']
})
export class DoctorReportsComponent implements OnInit {

  patientId: number;
  reports = [];
  examinations = [];
  modalMode: 'read' | 'write' | '' = '';
  reportForm = this.fb.group({
    diagnosis: ['', Validators.required],
    therapy: ['', Validators.required],
    controlDate: ['', Validators.required],
    controlTime: ['', Validators.required],
  });
  selectedReport;
  selectedExamination;
  constructor(
    private doctorService: DoctorService,
    private patientService: PatientService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({next: params => {
      this.patientId = params['id'];
      this.getPatientScheduledExaminations(this.patientId);
      this.getPatientReports(this.patientId);
    }});
  }

  getPatientReports(patientId: number) {
    this.patientService.getReports(patientId).subscribe({
      next: res => this.reports = res.reports
    })
  }

  getPatientScheduledExaminations(patientId: number) {
    this.patientService.getScheduledExaminations(patientId).subscribe({
      next: res => this.examinations = (res as any).filteredScheduledExaminations
    })
  }

  setWriteMode(examination){
    this.modalMode = 'write';
    this.selectedExamination = examination;
  }

  setReadMode(reportId) {
    this.modalMode = 'read';
    this.selectedReport = this.reports.find(report => report.id === reportId);
  }

  submit() {
    if(this.reportForm.valid) {
      const report = {
        scheduledExamination: this.selectedExamination,
        diagnosis: this.reportForm.value.diagnosis,
        therapy: this.reportForm.value.therapy,
        controlDate: this.reportForm.value.controlDate,
        controlTime: this.reportForm.value.controlTime
      }
      this.doctorService.submitReport(report).subscribe({
        next: res => {
          console.log('ok');
          this.reportForm.reset();
          this.getPatientScheduledExaminations(this.patientId);
          this.getPatientReports(this.patientId);
        }
      })
    }
  }
}