import { Component, OnInit } from '@angular/core';
import { Usuario } from '../login/shared/models/usuario.model';
import { UsuarioService } from '../login/shared/services/usuario.service';
import { FormGroup } from '@angular/forms';
import { ProfileService } from './shared/services/profile.service';
import { TranslateService } from '@ngx-translate/core';
import { SwalService } from 'src/app/shared/services/swal.service';
import { Icon } from 'src/app/shared/enums/icon.enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  formulario: FormGroup;
  formularioImagen: FormGroup;
  usuario: Usuario;
  imagen = null;
  imagenTemporal = null;
  constructor(
    public usuarioService: UsuarioService,
    private profileService: ProfileService,
    private translateService: TranslateService,
    private swalService: SwalService
  ) {
    this.usuario = this.usuarioService.usuario;
    this.formulario = this.profileService.inicializarFormularioProfile(this.usuario);
    this.formularioImagen = this.profileService.inicializarFormularioImagen();
  }

  ngOnInit() {}

  actualizarPerfil() {
    this.profileService.actualizarPerfil(this.formulario);
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
    this.usuarioService.actualizarImagen(this.imagen).subscribe(() => {
      this.imagen = null;
      this.formularioImagen.reset();
    });
  }

  public get sinImagenSeleccionada() {
    return this.imagen === null || this.imagen === undefined;
  }
}
