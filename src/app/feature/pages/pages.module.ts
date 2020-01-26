import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas/graficas1/graficas1.component';
import { LoginComponent } from './login/login.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { RegisterComponent } from './login/register.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    SharedModule,
    CoreModule,
    PagesRoutingModule
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
  ]
})
export class PagesModule { }
