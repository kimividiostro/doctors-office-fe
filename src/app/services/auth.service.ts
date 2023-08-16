import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(credentials: any): boolean {
    return !!credentials;
  }
  
  constructor() { }
}
