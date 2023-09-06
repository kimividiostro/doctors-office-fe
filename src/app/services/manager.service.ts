import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SpecializationDTO } from '../models/specialization';
import { ExaminationsDTO } from '../models/examination';

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

  addExamination(type: string, price: number, specializationId: number, duration?: string,) {
    return this.http.post(environment.apiUrl + '/examination', { type, specialization: specializationId, price, duration});
  }

  acceptPendingRegistration(id: number) {
    return this.http.post(environment.apiUrl + '/acceptPendingRegistration', { id });
  }

  declinePendingRegistration(id: number) {
    return this.http.post(environment.apiUrl + '/declinePendingRegistration', { id });
  }
}
