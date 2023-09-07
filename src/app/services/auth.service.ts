import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Patient } from '../models/patient';
import { Doctor } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user: User = {
    role: 'doctor',
  };

  constructor(private http: HttpClient, private router: Router) {
    this.user.data = JSON.parse(localStorage.getItem('doctor'));
    this.user.role = 'doctor';
  }

  loginDoctor(userName: string, password: string) {
    this.http.post<{doctor: Doctor}>(environment.apiUrl + '/doctor/login', {
      userName: userName,
      password: password
    })
    .subscribe(
      {
       next: doctor => { 
        this.user.role = 'doctor';
        this.user.data = doctor.doctor;
        this.router.navigate(['/doctor/profile']); 
      },
       error: error => console.log(error) // TODO: add error handling 
      }
    )
  }

  loginPatient(userName: string, password: string) {
    this.http.post<Patient>(environment.apiUrl + '/patient/login', {
      userName: userName,
      password: password
    })
    .subscribe(
      {
        next: patient => {
          this.user.role = 'patient';
          this.user.data = patient;
          this.router.navigate(['']);
        },
        error: error => console.log(error)
      }
    )
  }

  loginAdmin(userName: string, password: string) {
    this.http.post(environment.apiUrl + '/manager/login', {
      userName: userName,
      password: password
    })
    .subscribe(
      {
        next: manager => {
          this.user.role = 'manager';
          this.router.navigate(['home']);
        },
        error: error => console.log(error)
      }
    );
  }

  logOut() {
    this.user.role = 'visitor';
    this.router.navigate(['']);
  }
  
  changePassword(oldPassword, newPassword, repeatPassword) {
    const id = 1; // TODO: make dynamic
    return this.http.post(environment.apiUrl + '/patient/changePassword', {
      id,
      role: this.user.role,
      oldPassword, 
      newPassword, 
      repeatPassword
    });
  }
}
