import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-examination-requests',
  templateUrl: './examination-requests.component.html',
  styleUrls: ['./examination-requests.component.css']
})
export class ExaminationRequestsComponent implements OnInit {

  examinationRequests;

  constructor(
    private managerService: ManagerService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    if(this.authService.user.role !== 'manager') {
      this.router.navigate(['']);
    }
    this.getExaminationRequest();
  }

  evaluateRequest(doctorId: number, evaluation: boolean) {
    this.managerService.evaluateExaminationRequest(doctorId, evaluation).subscribe({
      next: res => this.getExaminationRequest(),
      error: e => console.log(e)
    })
  }

  getExaminationRequest() {
    this.managerService.getExaminationRequests().subscribe({
      next: req => this.examinationRequests = req,
      error: e => console.log(e)
    });
  }
}
