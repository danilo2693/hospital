import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CoreModule } from '../../../core/core.module';
import { MantenimientosRoutingModule } from './mantenimientos-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';

@NgModule({
  declarations: [UsuariosComponent, HospitalesComponent, MedicosComponent, MedicoComponent],
  imports: [SharedModule, CoreModule, MantenimientosRoutingModule]
})
export class MantenimientosModule {}
