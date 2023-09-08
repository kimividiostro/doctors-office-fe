import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Patient } from 'src/app/models/patient';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  patients: Patient[];

  constructor(private managerService: ManagerService) { }

  ngOnInit(): void {
    this.getPatients();
  }
  
  getPatients() {
    this.managerService.getPatients().subscribe({
      next: patients => this.patients = patients,
      error: e => console.log(e) // TODO: add error handling
    })
  }
}
