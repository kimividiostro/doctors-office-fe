import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  registerPatient(patient: Patient) {
    const { userName,
    password,
    firstName,
    lastName,
    address,
    phone,
    email,
    profilePic } = patient;

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

  getRegistrationRequests() {
    return this.http.get<Patient[]>(environment.apiUrl + '/pendingRegistrations');
  }
}
