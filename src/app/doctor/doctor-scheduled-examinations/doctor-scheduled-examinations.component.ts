import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctor-scheduled-examinations',
  templateUrl: './doctor-scheduled-examinations.component.html',
  styleUrls: ['./doctor-scheduled-examinations.component.css']
})
export class DoctorScheduledExaminationsComponent implements OnInit {

  scheduledExaminations = []; // TODO: create model
  constructor(
    private doctorService: DoctorService, 
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    if(this.authService.user.role !== 'doctor') {
      this.router.navigate(['**']);
    }

    this.getScheduledExaminations();
  }

  getScheduledExaminations() {
    this.doctorService.getScheduledExaminations(this.authService.user.data.id).subscribe({
      next: res => this.scheduledExaminations = (res as any).filteredScheduledExaminations?.slice(0, 3),
      error: e => console.log(e) // TODO: add error handling
    });
  }
}
