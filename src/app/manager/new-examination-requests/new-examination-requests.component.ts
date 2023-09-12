import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Examination } from 'src/app/models/examination';
import { AuthService } from 'src/app/services/auth.service';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-new-examination-requests',
  templateUrl: './new-examination-requests.component.html',
  styleUrls: ['./new-examination-requests.component.css']
})
export class NewExaminationRequestsComponent implements OnInit {
  pendingExaminations: Examination[];

  constructor(
    private managerService: ManagerService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    if(this.authService.user.role !== 'manager') {
      this.router.navigate(['**']);
    }
    this.getPendingExaminationRequests();
  }

  getPendingExaminationRequests() {
    this.managerService.getPendingExaminationRequests().subscribe({
      next: res => this.pendingExaminations = res,
      error: e => console.log("error") // TODO: add error handling
    });
  }

  evaluateRequest(examinationId: number, evaluation: boolean) {
    this.managerService.evaluateNewExaminationRequest(examinationId, evaluation).subscribe({
      next: res => this.getPendingExaminationRequests(),
      error: e => console.log('error') // TODO: add error handling
    });
  }
}
