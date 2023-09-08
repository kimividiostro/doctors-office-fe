import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormUserComponent } from './forms/login-form-user/login-form-user.component';
import { HomeComponent } from './home/home.component';
import { LoginFormAdminComponent } from './forms/login-form-admin/login-form-admin.component';
import { SpecializationsComponent } from './manager/specializations/specializations.component';
import { ExaminationsComponent } from './manager/examinations/examinations.component';
import { DoctorsComponent } from './manager/doctors/doctors.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { RegisterFormPatientComponent } from './forms/register-form-patient/register-form-patient.component';
import { RegistrationRequestsComponent } from './manager/registration-requests/registration-requests.component';
import { ChangePasswordComponent } from './forms/change-password/change-password.component';
import { PatientProfileComponent } from './patient/patient-profile/patient-profile.component';
import { DoctorViewComponent } from './patient/doctor-view/doctor-view.component';
import { DoctorProfileComponent } from './doctor/doctor-profile/doctor-profile.component';
import { DoctorOtherComponent } from './doctor/doctor-other/doctor-other.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormUserComponent,
    HomeComponent,
    LoginFormAdminComponent,
    SpecializationsComponent,
    ExaminationsComponent,
    DoctorsComponent,
    DoctorListComponent,
    RegisterFormPatientComponent,
    RegistrationRequestsComponent,
    ChangePasswordComponent,
    PatientProfileComponent,
    DoctorViewComponent,
    DoctorProfileComponent,
    DoctorOtherComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
