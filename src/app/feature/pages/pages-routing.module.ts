import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuard } from 'src/app/core/guard/login.guard';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { VerificarTokenGuard } from '../../core/guard/verificar-token.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard'
  },
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuard],
    canActivateChild: [VerificarTokenGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard' }
      },
      { path: 'progress', component: ProgressComponent, data: { title: 'ProgressBar' } },
      { path: 'promesas', component: PromesasComponent, data: { title: 'Promises' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' } },
      { path: 'search/:term', component: BusquedaComponent, data: { title: 'Search' } },
      {
        path: '',
        loadChildren: () => import('src/app/feature/pages/account/account.module').then(m => m.AccountModule)
      },
      {
        path: 'maintenance',
        loadChildren: () =>
          import('src/app/feature/pages/mantenimientos/mantenimientos.module').then(m => m.MantenimientosModule)
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
