import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  userRole!: string;

  constructor(private http: HttpClient, private router: Router) {}

  loginDoctor(userName: string, password: string) {
    this.http.post(environment.apiUrl + '/doctor/login', {
      userName: userName,
      password: password
    })
    .subscribe(
      {
       next: doctor => console.log(doctor),
       error: error => console.log(error) 
      }
    )
  }

  loginPatient(userName: string, password: string) {
    this.http.post(environment.apiUrl + '/patient/login', {
      userName: userName,
      password: password
    })
    .subscribe(
      {
        next: patient => console.log(patient),
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
          this.router.navigate(['home']);
        },
        error: error => console.log(error)
      }
    );
  } 
}
