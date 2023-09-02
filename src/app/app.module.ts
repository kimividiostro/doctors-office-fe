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
import { ExaminationTypesComponent } from './manager/examination-types/examination-types.component';
import { DoctorsComponent } from './manager/doctors/doctors.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { RegisterFormPatientComponent } from './forms/register-form-patient/register-form-patient.component';
import { RegistrationRequestsComponent } from './manager/registration-requests/registration-requests.component';
import { ChangePasswordComponent } from './forms/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormUserComponent,
    HomeComponent,
    LoginFormAdminComponent,
    SpecializationsComponent,
    ExaminationTypesComponent,
    DoctorsComponent,
    DoctorListComponent,
    RegisterFormPatientComponent,
    RegistrationRequestsComponent,
    ChangePasswordComponent,
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
