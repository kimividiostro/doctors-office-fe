import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-patient-doctor-list',
  templateUrl: './patient-doctor-list.component.html',
  styleUrls: ['./patient-doctor-list.component.css']
})
export class PatientDoctorListComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.authService.user.role !== 'patient') {
      this.router.navigate(['']);
    }
  }

}
