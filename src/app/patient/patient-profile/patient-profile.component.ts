import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  patient;
  constructor() { }

  ngOnInit(): void {
    this.patient = {
      firstName: 'Pera',
      lastName: 'Peric',
      address: 'Topolska 18',
      email: 'pera@mail.com',
      phone: '213123213',
    }
  }

}
