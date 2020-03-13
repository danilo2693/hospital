import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../login/shared/services/usuario.service';
import { SwalService } from 'src/app/shared/services/swal.service';
import { HospitalesFormularioService } from './shared/services/hospitales-formulario.service';
import { TranslateService } from '@ngx-translate/core';
import { UploadImageService } from 'src/app/shared/services/upload-image.service';
import { HospitalService } from './shared/services/hospital.service';
import { Hospital } from './shared/models/hospital.model';
import { Tabla } from 'src/app/shared/enums/tablas.enum';
import { Icon } from 'src/app/shared/enums/icon.enum';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html'
})
export class HospitalesComponent implements OnInit {
  cargando = false;
  desde = 0;
  cantidadHospitales = 0;
  constructor(
    private usuarioService: UsuarioService,
    private hospitalService: HospitalService,
    private swalService: SwalService,
    public hospitalesFormularioService: HospitalesFormularioService,
    private translateService: TranslateService,
    public uploadImageService: UploadImageService
  ) {}

  ngOnInit() {
    this.cargarHospitales();
    this.uploadImageService.notificar.subscribe(() => {
      this.cargarHospitales();
    });
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.obtenerHospitales(this.desde).subscribe((respuesta: any) => {
      this.actualizarHospitales(respuesta);
    });
  }

  actualizarHospitales(respuesta) {
    this.cantidadHospitales = respuesta.total;
    console.log(respuesta);
    const hospitales: Hospital[] = respuesta.hospitales ? respuesta.hospitales : respuesta.hospital;
    console.log(hospitales);
    this.hospitalesFormularioService.agregarVariosHospitales(hospitales);
    this.cargando = false;
  }

  buscarHospitales(palabra: string) {
    if (palabra.length > 0) {
      this.usuarioService.buscarColeccion(Tabla.HOSPITAL, palabra).subscribe((respuesta: any) => {
        this.actualizarHospitales(respuesta);
      });
    } else {
      this.cargarHospitales();
    }
  }

  limpiarHospitales(input) {
    input.value = '';
    this.cargarHospitales();
  }

  actualizarHospital(hospital: Hospital) {
    this.hospitalService
      .actualizarHospital(hospital)
      .subscribe(() => this.swalService.toast(this.translateService.instant('DataUpdateSuccess')));
  }

  confirmarBorrarHospital(id, nombre) {
    this.swalService.confirm(
      this.translateService.instant('Confirm'),
      this.translateService.instant('DeleteLabelConfirm', { name: nombre }),
      Icon.WARNING,
      this.translateService.instant('YesDelete'),
      this.translateService.instant('Cancel'),
      { clickConfirm: () => this.borrarHospital(id) }
    );
  }

  alertaCrearHospital() {
    this.swalService
      .inputText(
        this.translateService.instant('CreateHospital'),
        this.translateService.instant('TypeHospitalName'),
        Icon.INFO,
        this.translateService.instant('Create'),
        this.translateService.instant('Cancel'),
        this.translateService.instant('PleaseYouMustTypeHospitalName')
      )
      .then(respuesta => {
        this.crearHospital(respuesta);
      });
  }

  crearHospital(respuesta) {
    if (respuesta.value) {
      this.hospitalService.crearHospital(new Hospital(respuesta.value)).subscribe(() => {
        this.desde = 0;
        this.cargarHospitales();
        this.swalService.toast(this.translateService.instant('CreateHospitalSuccess'));
      });
    }
  }

  borrarHospital(id: string) {
    return this.hospitalService.eliminarHospital(id).subscribe(() => {
      this.desde = 0;
      this.cargarHospitales();
      this.swalService.toast(this.translateService.instant('DeleteHospitalSuccess'));
    });
  }

  cambiarRangoHospitales(valorRango: number) {
    const desde = this.desde + valorRango;
    if (desde >= this.cantidadHospitales || desde < 0) {
      return;
    } else {
      this.desde += valorRango;
      this.cargarHospitales();
    }
  }

  trackByFn(index) {
    return index;
  }
}
