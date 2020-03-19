import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/core/guard/admin.guard';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';

const routes: Routes = [
  { path: 'users', component: UsuariosComponent, canActivate: [AdminGuard], data: { title: 'Users' } },
  { path: 'hospitals', component: HospitalesComponent, data: { title: 'Hospitals' } },
  { path: 'doctors', component: MedicosComponent, data: { title: 'Doctors' } },
  { path: 'doctor/:id', component: MedicoComponent, data: { title: 'Doctor' } }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenimientosRoutingModule {}
