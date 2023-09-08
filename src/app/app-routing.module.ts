import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormUserComponent } from './forms/login-form-user/login-form-user.component';
import { HomeComponent } from './home/home.component';
import { LoginFormAdminComponent } from './forms/login-form-admin/login-form-admin.component';
import { SpecializationsComponent } from './manager/specializations/specializations.component';
import { ExaminationsComponent } from './manager/examinations/examinations.component';
import { DoctorsComponent } from './manager/doctors/doctors.component';
import { RegisterFormPatientComponent } from './forms/register-form-patient/register-form-patient.component';
import { RegistrationRequestsComponent } from './manager/registration-requests/registration-requests.component';
import { ChangePasswordComponent } from './forms/change-password/change-password.component';
import { PatientProfileComponent } from './patient/patient-profile/patient-profile.component';
import { DoctorViewComponent } from './patient/doctor-view/doctor-view.component';
import { DoctorProfileComponent } from './doctor/doctor-profile/doctor-profile.component';
import { DoctorOtherComponent } from './doctor/doctor-other/doctor-other.component';
import { NewExaminationRequestsComponent } from './manager/new-examination-requests/new-examination-requests.component';

const routes: Routes = [
  { path: 'login', component: LoginFormUserComponent },
  { path: 'register', component: RegisterFormPatientComponent },
  { path: 'admin-login', component: LoginFormAdminComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'manager', children: [
    { path: 'specializations', component: SpecializationsComponent },
    { path: 'examinations', component: ExaminationsComponent },
    { path: 'doctors', component: DoctorsComponent },
    { path: 'registration-requests', component: RegistrationRequestsComponent },
    { path: 'new-examination-requests', component: NewExaminationRequestsComponent }
  ]},
  { path: 'patient', children: [
    { path: 'profile', component: PatientProfileComponent },
    { path: 'doctor-view/:id', component: DoctorViewComponent }
  ]},
  { path: 'doctor', children: [
    { path: 'profile', component: DoctorProfileComponent },
    { path: 'other', component: DoctorOtherComponent }
  ]},
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent } // TODO: add 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
