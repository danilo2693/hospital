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
import { ChartsModule } from 'ng2-charts';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ServiceModule } from '../../shared/services/service.module';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    LoginComponent,
    RegisterComponent,
    AccountSettingsComponent,
  ],
  imports: [
    SharedModule,
    CoreModule,
    PagesRoutingModule,
    ServiceModule
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    SharedModule
  ]
})
export class PagesModule { }
