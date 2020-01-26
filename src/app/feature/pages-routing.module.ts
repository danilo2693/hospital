import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graficas1Component } from './pages/graficas/graficas1/graficas1.component';
import { LoginComponent } from './pages/login/login.component';
import { PagesComponent } from './pages/pages.component';
import { NopagefoundComponent } from '../core/nopagefound/nopagefound.component';
import { RegisterComponent } from './pages/login/register.component';
const routes: Routes = [
  { path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent},
      { path: 'progress', component: ProgressComponent},
      { path: 'graficas1', component: Graficas1Component},
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
