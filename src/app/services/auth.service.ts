import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User, UserRole } from '../models/user';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user: User = {
    role: 'visitor'
  };

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {}

  login(userRole: UserRole, userName: string, password: string) {
    this.http.post(environment.apiUrl + '/auth/login', {
      userName,
      userRole,
      password
    }).subscribe({
      next: res => {
        this.cookieService.set('sessionId', (res as any).sessionId);
        this.user = {
          data: (res as any).user,
          role: userRole
        }
        this.router.navigate(['']);
      },
      error: e => console.log(e) // TODO: add message to form
    });
  }

  logOut() {
    this.http.post(environment.apiUrl + '/auth/logout', {
      sessionId: this.cookieService.get('sessionId')
    }).subscribe({
      next: res => {
        this.user = { role: 'visitor' };
        this.router.navigate(['']);
      }
    })
  }
  
  changePassword(oldPassword, newPassword, repeatPassword) {
    const id = 1; // TODO: make dynamic
    return this.http.post(environment.apiUrl + '/patient/changePassword', {
      id,
      role: this.user.role,
      oldPassword, 
      newPassword, 
      repeatPassword
    });
  }
}
