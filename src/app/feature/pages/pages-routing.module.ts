import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas/graficas1/graficas1.component';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages.component';
import { NopagefoundComponent } from '../../core/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from 'src/app/core/guard/login-guard.guard';

const routes: Routes = [
  { path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard'}},
      { path: 'progress', component: ProgressComponent, data: { title: 'ProgressBar' }},
      { path: 'graficas1', component: Graficas1Component, data: { title: 'Graphics'}},
      { path: 'promesas', component: PromesasComponent, data: { title: 'Promises'}},
      { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs'}},
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Settings'}},
      { path: '', pathMatch: 'full', redirectTo: '/dashboard' }
    ]
  },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '**', component: NopagefoundComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
