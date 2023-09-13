import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Examination } from 'src/app/models/examination';
import { Specialization } from 'src/app/models/specialization';
import { AuthService } from 'src/app/services/auth.service';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-examinations',
  templateUrl: './examinations.component.html',
  styleUrls: ['./examinations.component.css']
})
export class ExaminationsComponent implements OnInit {
  examinations: Examination[];
  specializations: Specialization[];
  inputForm = this.fb.group({
    type: ['', Validators.required],
    specialization: ['', Validators.required],
    price: ['', Validators.required],
    durationInMinutes: ['']
  });

  constructor(
    private managerService: ManagerService, 
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    if(this.authService.user.role !== 'manager') {
      this.router.navigate(['']);
    }
    this.getExaminationsTypes();
    this.getSpecializations()
  }

  getExaminationsTypes() {
    this.managerService.getExaminations().subscribe(
      res => this.examinations = res.examinations
    );
  }

  getSpecializations() {
    this.managerService.getSpecializations().subscribe(
      res => this.specializations = res.specializations
    );
    
  }

  addExaminationType() {
    if(this.inputForm.valid) {
      this.managerService.addExamination(this.inputForm.value.type, Number(this.inputForm.value.price), 
        Number(this.inputForm.value.specialization), Number(this.inputForm.value.durationInMinutes)).subscribe(
          res => this.getExaminationsTypes()
      );
    }
  }
}
