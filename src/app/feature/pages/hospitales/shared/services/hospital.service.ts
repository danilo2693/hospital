import { Injectable } from '@angular/core';
import { PeticionesService } from 'src/app/core/services/peticiones.service';
import { apiHospital } from 'src/app/shared/config/config';
import { Hospital } from '../models/hospital.model';
import { UsuarioService } from '../../../login/shared/services/usuario.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  constructor(private peticionesService: PeticionesService, public usuarioService: UsuarioService) {}

  obtenerHospitales(desde = 0) {
    return this.peticionesService.get(`${apiHospital}?desde=${desde}`);
  }

  obtenerHospitalPorId(id: string): Observable<Hospital> {
    return this.peticionesService.get(`${apiHospital}/${id}`).pipe(
      map((respuesta: any) => respuesta.hospital)
    );
  }

  crearHospital(hospital: Hospital) {
    return this.peticionesService.post(`${apiHospital}?token=${this.usuarioService.token}`, hospital).pipe(
      map((respuesta: any) => {
        return respuesta.hospital;
      })
    );
  }

  actualizarHospital(hospital: Hospital) {
    return this.peticionesService
      .put(`${apiHospital}/${hospital._id}?token=${this.usuarioService.token}`, hospital)
      .pipe(
        map((respuesta: any) => {
          return respuesta.hospital;
        })
      );
  }

  eliminarHospital(id: string) {
    return this.peticionesService.delete(`${apiHospital}/${id}?token=${this.usuarioService.token}`);
  }
}
