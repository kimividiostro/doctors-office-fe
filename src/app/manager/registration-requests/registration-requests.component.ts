import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from 'src/app/models/patient';
import { AuthService } from 'src/app/services/auth.service';
import { ManagerService } from 'src/app/services/manager.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-registration-requests',
  templateUrl: './registration-requests.component.html',
  styleUrls: ['./registration-requests.component.css']
})
export class RegistrationRequestsComponent implements OnInit {
  pendingRequests: Patient[];
  message = '';

  constructor(
    private patientService: PatientService, 
    private managerService: ManagerService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    if(this.authService.user.role !== 'manager') {
      this.router.navigate(['']);
    }
    this.getRegistrationRequests();
  }

  getRegistrationRequests() {
    this.patientService.getRegistrationRequests().subscribe({
      next: req => this.pendingRequests = req
    });
  }

  acceptRequest(id: number) {
    this.managerService.approvePendingRegistration(id).subscribe({
      next: res => {
        this.getRegistrationRequests();
      },
      error: e => {
        this.message = 'Something went wrong. Please try again later';
        setTimeout(() => {
          this.message = '';
        }, 3000)
      }
    });
  }

  declineRequest(id: number) {
    this.managerService.declinePendingRegistration(id).subscribe({
      next: res => {
        this.getRegistrationRequests();
      },
      error: e => {
        this.message = 'Something went wrong. Please try again later';
        setTimeout(() => {
          this.message = '';
        }, 3000)
      }
    });
  }


}
