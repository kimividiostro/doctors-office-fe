import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  patient: Patient = this.authService.user.data as Patient;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
