import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-my-examinations',
  templateUrl: './my-examinations.component.html',
  styleUrls: ['./my-examinations.component.css']
})
export class MyExaminationsComponent implements OnInit {

  scheduledExaminations = [];

  constructor(private authService: AuthService, private patientService: PatientService) { }

  ngOnInit(): void {
    this.getScheduledExaminations();
  }

  getScheduledExaminations() {
    this.patientService.getScheduledExaminations(this.authService.user.data.id).subscribe({
      next: res => {
        console.log(res)
        this.scheduledExaminations = res.filteredScheduledExaminations;
      },
      error: e => console.log(e)
    });
  }

  cancelScheduledExamination(id: number) {
    this.patientService.cancelScheduledExamination(id).subscribe({
      next: res => this.getScheduledExaminations(),
      error: e => console.log(e) // TODO: add error handling
    })
  }
}
