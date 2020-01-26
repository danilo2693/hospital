import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas/graficas1/graficas1.component';
import { LoginComponent } from './login/login.component';
import { PagesRoutingModule } from '../pages-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { PagesComponent } from './pages.component';
import { RegisterComponent } from './login/register.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    LoginComponent,
    PagesComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
