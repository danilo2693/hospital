import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProfileService } from './shared/services/profile.service';
import { UploadImageService } from 'src/app/shared/services/upload-image.service';
import { ErroresService } from 'src/app/shared/services/errores.service';
import { Usuario } from 'src/app/feature/login-register/login/shared/models/usuario.model';
import { UsuarioService } from 'src/app/feature/login-register/login/shared/services/usuario.service';

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
    public uploadImageService: UploadImageService,
    public erroresService: ErroresService
  ) {
    this.usuario = this.usuarioService.usuario;
    this.formulario = this.profileService.inicializarFormularioProfile(this.usuario);
    this.formularioImagen = this.profileService.inicializarFormularioImagen();
  }

  ngOnInit() {
    this.uploadImageService.inicializarVariables('', 'usuario', this.usuarioService.usuario._id);
  }

  actualizarPerfil() {
    this.profileService.actualizarPerfil(this.formulario);
  }
}
