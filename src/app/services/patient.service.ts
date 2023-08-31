import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  registerUser(user) {
    const { userName,
    password,
    firstName,
    lastName,
    address,
    phone,
    email,
    profilePic } = user;

    return this.http.post(environment.apiUrl + '/pendingRegistration', {
      userName,
      password,
      firstName,
      lastName,
      address,
      phone,
      email,
      profilePic,
    });
  }
}
