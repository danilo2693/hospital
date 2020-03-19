import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { BusquedaComponent } from 'src/app/feature/pages/busqueda/busqueda.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    PromesasComponent,
    RxjsComponent,
    BusquedaComponent
  ],
  imports: [SharedModule, CoreModule, PagesRoutingModule],
  exports: [DashboardComponent, ProgressComponent, SharedModule]
})
export class PagesModule {}
