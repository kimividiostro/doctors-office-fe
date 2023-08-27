import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Specialization } from 'src/app/models/specialization';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-specializations',
  templateUrl: './specializations.component.html',
  styleUrls: ['./specializations.component.css']
})
export class SpecializationsComponent implements OnInit {
  specializations: Specialization[];
  inputForm = this.fb.group({
    type: ['', Validators.required]
  });

  constructor(private managerService: ManagerService, private fb: FormBuilder) { }
  

  ngOnInit(): void {
    this.getSpecializations();
  }

  getSpecializations() {
    this.managerService.getSpecializations().subscribe(
      res => this.specializations = res.specializations
    )
  }

  addSpecialization() {
    if(this.inputForm.valid) {
      this.managerService.addSpecialization(this.inputForm.value.type).subscribe(
        res => {
          this.getSpecializations();
        }
      );
    }
  }
}
