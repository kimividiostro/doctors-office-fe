import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SpecializationDTO } from '../models/specialization';
import { ExaminationTypeDTO } from '../models/examination-type';

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

  getExaminationsTypes() {
    return this.http.get<ExaminationTypeDTO>(environment.apiUrl + '/examinationType');
  }

  addExaminationType(type: string, specializationId: number) {
    return this.http.post(environment.apiUrl + '/examinationType', { type: type, specialization: specializationId});
  }

  acceptPendingRegistration(id: number) {
    return this.http.post(environment.apiUrl + '/acceptPendingRegistration', { id });
  }

  declinePendingRegistration(id: number) {
    return this.http.post(environment.apiUrl + '/declinePendingRegistration', { id });
  }
}
