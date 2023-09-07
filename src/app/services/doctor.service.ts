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
}
