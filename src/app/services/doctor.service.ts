import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DoctorDTO } from '../models/doctor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  getDoctors() {
    return this.http.get<DoctorDTO>(environment.apiUrl + '/doctor');
  }
}
