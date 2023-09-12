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
import { PatientListComponent } from './manager/patient-list/patient-list.component';
import { ExaminationRequestsComponent } from './manager/examination-requests/examination-requests.component';
import { MyExaminationsComponent } from './patient/my-examinations/my-examinations.component';
import { DoctorScheduledExaminationsComponent } from './doctor/doctor-scheduled-examinations/doctor-scheduled-examinations.component';
import { DoctorReportsComponent } from './doctor/doctor-reports/doctor-reports.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

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
    { path: 'examination-requests', component: ExaminationRequestsComponent },
    { path: 'new-examination-requests', component: NewExaminationRequestsComponent },
    { path: 'patients', component: PatientListComponent }
  ]},
  { path: 'patient', children: [
    { path: 'profile', component: PatientProfileComponent },
    { path: 'doctor-view/:id', component: DoctorViewComponent },
    { path: 'my-examinations', component: MyExaminationsComponent }
  ]},
  { path: 'doctor', children: [
    { path: 'profile', component: DoctorProfileComponent },
    { path: 'other', component: DoctorOtherComponent },
    { path: 'scheduled-examinations', component: DoctorScheduledExaminationsComponent },
    { path: 'report/:id', component: DoctorReportsComponent }
  ]},
  { path: '', component: HomeComponent },
  { path: '**', component: NotFoundPageComponent } // TODO: add 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
