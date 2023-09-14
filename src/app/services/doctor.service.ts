import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor, DoctorDTO } from '../models/doctor';
import { environment } from 'src/environments/environment';
import { Examination } from '../models/examination';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  getDoctors() {
    return this.http.get<DoctorDTO>(environment.apiUrl + '/doctor');
  }

  getDoctor(id: number) {
    return this.http.get<{doctor: Doctor}>(environment.apiUrl + `/doctor/${id}`);
  }

  addDoctor(doctor) {
    return this.http.post(environment.apiUrl + '/doctor', doctor);
  }

  updateDoctor(doctorId, data) {
    return this.http.patch(environment.apiUrl + `/doctor/${doctorId}`, data);
  }

  deleteDoctor(doctorId) {
    return this.http.delete(environment.apiUrl + `/doctor/${doctorId}`);
  }

  getExaminationsByDoctor(id: number) {
    return this.http.get<Examination[]>(environment.apiUrl + `/examination/getExaminationsByDoctor/${id}`);
  }

  getExaminationsBySpecialization(id: number) {
    return this.http.get<Examination[]>(environment.apiUrl + `/examination/specialization/${id}`);
  }

  sendExaminationRequest(doctorId, examinations) {
    return this.http.post(environment.apiUrl + '/examination/request', {
      doctorId, examinations
    })
  }

  requestNewExamination(examination) {
    return this.http.post(environment.apiUrl + '/examination/new', { examination });
  }

  getScheduledExaminations(doctorId: number) {
    return this.http.get(environment.apiUrl + `/scheduledExamination/doctor/${doctorId}`);
  }

  submitReport(report) {
    return this.http.post(environment.apiUrl + '/report', report);
  }
}
