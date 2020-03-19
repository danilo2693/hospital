import { Injectable } from '@angular/core';
import { PeticionesService } from 'src/app/core/services/peticiones.service';
import { apiMedico } from 'src/app/shared/config/config';
import { map } from 'rxjs/operators';
import { Medico } from '../models/medico.model';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/feature/login-register/login/shared/services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  constructor(private peticionesService: PeticionesService, private usuarioService: UsuarioService) {}

  obtenerMedicos(desde = 0) {
    return this.peticionesService.get(`${apiMedico}?desde=${desde}`);
  }

  crearMedico(medico: Medico) {
    return this.peticionesService.post(`${apiMedico}?token=${this.usuarioService.token}`, medico).pipe(
      map((respuesta: any) => {
        return respuesta.medico;
      })
    );
  }

  obtenerMedicoPorId(id: string): Observable<Medico> {
    return this.peticionesService.get(`${apiMedico}/${id}`).pipe(map((respuesta: any) => respuesta.medico));
  }

  actualizarMedico(medico: Medico) {
    return this.peticionesService.put(`${apiMedico}/${medico._id}?token=${this.usuarioService.token}`, medico).pipe(
      map((respuesta: any) => {
        return respuesta.medico;
      })
    );
  }

  eliminarMedico(id: string) {
    return this.peticionesService.delete(`${apiMedico}/${id}?token=${this.usuarioService.token}`);
  }
}
