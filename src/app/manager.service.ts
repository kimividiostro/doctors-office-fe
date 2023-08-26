import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  
  constructor(private http: HttpClient) { }

  // TODO: add types

  getSpecializations() {
    return this.http.get<any>(environment.apiUrl + '/specialization');
  }

  addSpecialization(type: string) {
    return this.http.post(environment.apiUrl + '/specialization', {type: type});
  }

  getExaminationsTypes() {
    return this.http.get<any>(environment.apiUrl + '/examinationType');
  }

  addExaminationType(type: string, specializationId: number) {
    return this.http.post(environment.apiUrl + '/examinationType', { type: type, specialization: specializationId});
  }
}
