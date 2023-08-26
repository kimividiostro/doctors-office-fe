import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormUserComponent } from './forms/login-form-user/login-form-user.component';
import { HomeComponent } from './home/home.component';
import { LoginFormAdminComponent } from './forms/login-form-admin/login-form-admin.component';
import { SpecializationsComponent } from './manager/specializations/specializations.component';

const routes: Routes = [
  { path: 'login', component: LoginFormUserComponent },
  { path: 'admin-login', component: LoginFormAdminComponent },
  { path: 'manager', children: [
    { path: 'specializations', component: SpecializationsComponent }
  ]},
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent } // add not found page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
