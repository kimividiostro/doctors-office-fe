import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Patient } from '../models/patient';
import { Doctor } from '../models/doctor';
import { Examination } from '../models/examination';

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

  scheduleExamination(
    reasonForComing: string, 
    date: string, 
    time: string, 
    doctor: Doctor, 
    patient: Patient, 
    examination: Examination) {
      return this.http.post(environment.apiUrl + '/scheduledExamination', {
        reasonForComing,
        time,
        date,
        patient,
        doctor,
        examination
      })
  }

  getScheduledExaminations(id: number) {
    return this.http.get<any>(environment.apiUrl + `/scheduledExamination/patient/${id}`);
  }

  cancelScheduledExamination(id: number) {
    return this.http.delete(environment.apiUrl + `/scheduledExamination/${id}`);
  }

  getReports(id: number) {
    return this.http.get<{reports: []}>(environment.apiUrl + `/report/patient/${id}`);
  }
}
