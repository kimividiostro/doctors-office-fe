import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { Doctor } from '../models/doctor';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {
  
  firstName = '';
  lastName = '';
  specialization = '';
  officeDepartment = '';

  nameSorting = 'default';
  lastNameSorting = 'default';
  specializationSorting = 'default';
  officeDepartmentSorting = 'default';

  doctors: Doctor[];
  displayData: Doctor[];
  constructor(private doctorService: DoctorService, public authService: AuthService) { }

  ngOnInit(): void {
    this.doctorService.getDoctors().subscribe({
      next: res => { 
        this.doctors = res.doctors;
        this.displayData = res.doctors;
      }
    });
  }

  sortAndFilter() {

    let tmpArray = structuredClone(this.doctors);

    if(this.nameSorting === 'asc') {
      tmpArray = tmpArray.sort((a,b) => a.firstName > b.firstName ? 1 : -1)
    }

    if(this.nameSorting === 'desc') {
      tmpArray = tmpArray.sort((a,b) => a.firstName > b.firstName ? -1 : 1)
    }

    if(this.lastNameSorting === 'asc') {
      tmpArray = tmpArray.sort((a,b) => a.lastName > b.lastName ? 1 : -1)
    }

    if(this.lastNameSorting === 'desc') {
      tmpArray = tmpArray.sort((a,b) => a.lastName > b.lastName ? -1 : 1)
    }

    if(this.specializationSorting === 'asc') {
      tmpArray = tmpArray.sort((a,b) => a.specialization.type > b.specialization.type ? 1 : -1)
    }

    if(this.specializationSorting === 'desc') {
      tmpArray = tmpArray.sort((a,b) => a.specialization.type > b.specialization.type ? -1 : 1)
    }

    if(this.officeDepartmentSorting === 'asc') {
      tmpArray = tmpArray.sort((a,b) => a.officeDepartment > b.officeDepartment ? 1 : -1)
    }

    if(this.officeDepartmentSorting === 'desc') {
      tmpArray = tmpArray.sort((a,b) => a.officeDepartment > b.officeDepartment ? -1 : 1)
    }

    if(this.firstName) {
      tmpArray = tmpArray.filter(doc => doc.firstName.includes(this.firstName));
    }

    if(this.lastName) {
      tmpArray = tmpArray.filter(doc => doc.lastName.includes(this.lastName));
    }

    if(this.specialization) {
      tmpArray = tmpArray.filter(doc => doc.specialization.type.includes(this.specialization));
    }

    if(this.officeDepartment) {
      tmpArray = tmpArray.filter(doc => doc.officeDepartment.includes(this.officeDepartment));
    }
    
    this.displayData = tmpArray;

  }

  changeSort(type: string, field: string) {
    if(field === 'name') this.nameSorting = type;
    if(field === 'lastName') this.lastNameSorting = type;
    if(field === 'specialization') this.specializationSorting = type;
    if(field === 'officeDepartment') this.officeDepartmentSorting = type;
    this.sortAndFilter();
  }

  reset() {
    this.displayData = this.doctors;
    this.firstName = '';
    this.lastName = '';
    this.specialization = '';
    this.officeDepartment = '';
  }

  viewDoctor(id) {
    console.log(id)
  }
}
