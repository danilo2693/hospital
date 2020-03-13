import { Component, OnInit } from '@angular/core';
import { MedicosFormularioService } from './shared/services/medicos-formulario.service';
import { UploadImageService } from 'src/app/shared/services/upload-image.service';
import { MedicoService } from './shared/services/medico.service';
import { Medico } from './shared/models/medico.model';
import { SwalService } from '../../../shared/services/swal.service';
import { TranslateService } from '@ngx-translate/core';
import { Icon } from 'src/app/shared/enums/icon.enum';
import { Tabla } from 'src/app/shared/enums/tablas.enum';
import { UsuarioService } from '../login/shared/services/usuario.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  cargando = false;
  cantidadMedicos = 0;
  desde = 0;

  constructor(
    public medicosFormularioService: MedicosFormularioService,
    public uploadImageService: UploadImageService,
    private medicoService: MedicoService,
    private translateService: TranslateService,
    private swalService: SwalService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.cargarMedicos();
    this.uploadImageService.imagenTemporal = null;
    this.uploadImageService.notificar.subscribe(() => {
      this.cargarMedicos();
    });
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.obtenerMedicos(this.desde).subscribe((respuesta: any) => {
      this.actualizarMedicos(respuesta);
    });
  }

  alertaCrearMedico() {
    this.swalService
      .inputText(
        this.translateService.instant('CreateDoctor'),
        this.translateService.instant('TypeDoctorName'),
        Icon.INFO,
        this.translateService.instant('Create'),
        this.translateService.instant('Cancel'),
        this.translateService.instant('PleaseYouMustTypeDoctorName')
      )
      .then(respuesta => {
        this.crearMedico(respuesta);
      });
  }

  crearMedico(respuesta) {
    if (respuesta.value) {
      this.medicoService.crearMedico(new Medico(respuesta.value)).subscribe(() => {
        this.desde = 0;
        this.cargarMedicos();
        this.swalService.toast(this.translateService.instant('CreateMedicoSuccess'));
      });
    }
  }

  actualizarMedicos(respuesta) {
    this.cantidadMedicos = respuesta.total;
    const medicos = respuesta.medicos ? respuesta.medicos : respuesta.medico;
    this.medicosFormularioService.agregarVariosMedicos(medicos);
    this.cargando = false;
  }

  buscarMedico(palabra: string) {
    if (palabra.length > 0) {
      this.usuarioService.buscarColeccion(Tabla.MEDICO, palabra).subscribe((respuesta: any) => {
        this.actualizarMedicos(respuesta);
      });
    } else {
      this.cargarMedicos();
    }
  }

  limpiarMedicos() {
    this.cargarMedicos();
  }

  actualizarMedico() {}

  confirmarBorrarMedico(id, nombre) {
    this.swalService.confirm(
      this.translateService.instant('Confirm'),
      this.translateService.instant('DeleteLabelConfirm', { name: nombre }),
      Icon.WARNING,
      this.translateService.instant('YesDelete'),
      this.translateService.instant('Cancel'),
      { clickConfirm: () => this.borrarMedico(id) }
    );
  }

  borrarMedico(id: string) {
    return this.medicoService.eliminarMedico(id).subscribe(() => {
      this.desde = 0;
      this.cargarMedicos();
      this.swalService.toast(this.translateService.instant('DeleteDoctorSuccess'));
    });
  }

  cambiarRangoMedicos(valorRango: number) {
    const desde = this.desde + valorRango;
    if (desde >= this.cantidadMedicos || desde < 0) {
      return;
    } else {
      this.desde += valorRango;
      this.cargarMedicos();
    }
  }
}
