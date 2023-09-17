import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SpecializationDTO } from '../models/specialization';
import { Examination, ExaminationsDTO } from '../models/examination';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  
  constructor(private http: HttpClient) { }

  getSpecializations() {
    return this.http.get<SpecializationDTO>(environment.apiUrl + '/specialization');
  }

  addSpecialization(type: string) {
    return this.http.post(environment.apiUrl + '/specialization', {type: type});
  }

  getExaminations() {
    return this.http.get<ExaminationsDTO>(environment.apiUrl + '/examinations');
  }

  addExamination(type: string, price: number, specializationId: number, durationInMinutes?: number,) {
    return this.http.post(environment.apiUrl + '/examination', { type, specialization: specializationId, price, durationInMinutes});
  }

  approvePendingRegistration(id: number) {
    return this.http.post(environment.apiUrl + '/approvePendingRegistration', { id });
  }

  declinePendingRegistration(id: number) {
    return this.http.post(environment.apiUrl + '/declinePendingRegistration', { id });
  }

  getExaminationRequests() {
    return this.http.get(environment.apiUrl + '/examination/requests');
  }

  evaluateExaminationRequest(doctorId: number, evaluation: boolean) {
    return this.http.post(environment.apiUrl + '/examination/evaluate', { doctorId, evaluation });
  }

  getPendingExaminationRequests() {
    return this.http.get<Examination[]>(environment.apiUrl + '/examination/pending');
  }

  evaluateNewExaminationRequest(examinationId: number, evaluation: boolean) {
    return this.http.post(environment.apiUrl + '/examination/evaluateNew', {examinationId, evaluation});
  }

  getPatients() {
    return this.http.get<Patient[]>(environment.apiUrl + '/patient');
  }
}
