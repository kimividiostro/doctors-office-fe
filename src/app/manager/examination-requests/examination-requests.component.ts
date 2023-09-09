import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-examination-requests',
  templateUrl: './examination-requests.component.html',
  styleUrls: ['./examination-requests.component.css']
})
export class ExaminationRequestsComponent implements OnInit {

  examinationRequests;

  constructor(private managerService: ManagerService) { }

  ngOnInit(): void {
    this.getExaminationRequest();
  }

  evaluateRequest(doctorId: number, evaluation: boolean) {
    this.managerService.evaluateExaminationRequest(doctorId, evaluation).subscribe({
      next: res => this.getExaminationRequest(),
      error: e => console.log(e) // TODO: add error handling
    })
  }

  getExaminationRequest() {
    this.managerService.getExaminationRequests().subscribe({
      next: req => this.examinationRequests = req,
      error: e => console.log(e) // TODO: add error handling
    });
  }
}
