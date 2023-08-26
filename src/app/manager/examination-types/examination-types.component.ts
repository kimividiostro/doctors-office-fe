import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ManagerService } from 'src/app/manager.service';

@Component({
  selector: 'app-examination-types',
  templateUrl: './examination-types.component.html',
styleUrls: ['./examination-types.component.css']
})
export class ExaminationTypesComponent implements OnInit {
  examinationTypes;
  specializations;
  inputForm = this.fb.group({
    type: ['', Validators.required],
    specialization: ['', Validators.required]
  });

  constructor(private managerService: ManagerService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getExaminationsTypes();
    this.getSpecializations()
  }

  getExaminationsTypes() {
    this.managerService.getExaminationsTypes().subscribe(
      res => {this.examinationTypes = res.examinationTypes;}
    );
  }

  getSpecializations() {
    this.managerService.getSpecializations().subscribe(
      res => this.specializations = res.specializations
    );
    
  }

  addExaminationType() {
    if(this.inputForm.valid) {
      this.managerService.addExaminationType(this.inputForm.value.type, 
        Number(this.inputForm.value.specialization)).subscribe(
          res => this.getExaminationsTypes()
      );
    }
  }
}
