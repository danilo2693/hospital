import { Injectable } from '@angular/core';
import { PeticionesService } from '../../../../../core/services/peticiones.service';
import { apiBusquedaTodo } from 'src/app/shared/config/config';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {
  constructor(private peticionesService: PeticionesService) {}

  buscar(termino: string) {
    return this.peticionesService.get(`${apiBusquedaTodo}/${termino}`);
  }
}
