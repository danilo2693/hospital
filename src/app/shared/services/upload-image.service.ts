import { Injectable, EventEmitter } from '@angular/core';
import { SwalService } from './swal.service';
import { TranslateService } from '@ngx-translate/core';
import { Icon } from '../enums/icon.enum';
import { FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/feature/login-register/login/shared/models/usuario.model';
import { UsuarioService } from 'src/app/feature/login-register/login/shared/services/usuario.service';
import { ProfileService } from 'src/app/feature/pages/account/profile/shared/services/profile.service';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {
  urlImagenActual = 'xxx';
  mostrar = false;
  imagen = null;
  imagenTemporal = null;
  formularioImagen: FormGroup;
  usuario: Usuario;
  tabla: string;
  id: string;
  enModal = true;
  notificar = new EventEmitter<boolean>();
  constructor(
    private swalService: SwalService,
    private translateService: TranslateService,
    public usuarioService: UsuarioService,
    private profileService: ProfileService
  ) {
    this.usuario = this.usuarioService.usuario;
    this.formularioImagen = this.profileService.inicializarFormularioImagen();
  }

  mostrarModal(urlImagenActual, tabla, id) {
    this.inicializarVariables(urlImagenActual, tabla, id);
    this.mostrar = true;
  }

  ocultarModal() {
    this.reiniciarVariables();
    this.mostrar = false;
  }

  inicializarVariables(urlImagenActual: string, tabla: string, id: string) {
    this.urlImagenActual = urlImagenActual;
    this.tabla = tabla;
    this.id = id;
  }

  reiniciarVariables() {
    this.urlImagenActual = '';
    this.tabla = null;
    this.id = null;
    this.imagen = null;
    this.imagenTemporal = null;
  }

  cargarImagen(event) {
    this.imagen = event.target.files[0];
    if (this.esImagen(this.imagen)) {
      const reader = new FileReader();
      reader.readAsDataURL(this.imagen);
      reader.onload = () => {
        this.imagenTemporal = reader.result;
      };
    }
  }

  esImagen(imagen) {
    let respuesta = false;
    if (imagen) {
      if (imagen.type.includes('image')) {
        respuesta = true;
      } else {
        this.swalService.alert('Error', this.translateService.instant('OnlyImages'), Icon.ERROR);
      }
    }
    return respuesta;
  }

  subirImagen() {
    this.usuarioService.actualizarImagen(this.imagen, this.tabla, this.id).subscribe(respuesta => {
      this.imagen = null;
      this.formularioImagen.reset();
      this.notificar.emit(respuesta);
      this.ocultarModal();
    });
  }

  public get sinImagenSeleccionada() {
    return this.imagen === null || this.imagen === undefined;
  }
}
