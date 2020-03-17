import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedaService } from './shared/services/busqueda.service';
import { Usuario } from '../login/shared/models/usuario.model';
import { Medico } from '../medicos/shared/models/medico.model';
import { Hospital } from '../hospitales/shared/models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {
  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];
  constructor(private activatedRoute: ActivatedRoute, private busquedaService: BusquedaService) {
    this.activatedRoute.params.subscribe(parametros => {
      this.buscar(parametros.term);
    });
  }

  ngOnInit() {}

  buscar(termino: string) {
    this.busquedaService.buscar(termino).subscribe((respuesta: any) => {
      this.usuarios = respuesta.usuarios;
      this.medicos = respuesta.medicos;
      this.hospitales = respuesta.hospitales;
    });
  }
}
