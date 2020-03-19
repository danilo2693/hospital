import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SwalService } from 'src/app/shared/services/swal.service';
import { Usuario } from 'src/app/feature/login-register/login/shared/models/usuario.model';
import { UsuarioService } from 'src/app/feature/login-register/login/shared/services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  usuario: Usuario;
  constructor(
    private translateService: TranslateService,
    private usuarioService: UsuarioService,
    private swalService: SwalService
  ) {
    this.usuario = this.usuarioService.usuario;
  }

  inicializarFormularioProfile(usuario: Usuario) {
    return new FormGroup({
      nombre: new FormControl(usuario.nombre, Validators.required),
      email: new FormControl({ value: usuario.email, disabled: usuario.google }, [
        Validators.required,
        Validators.email
      ])
    });
  }

  inicializarFormularioImagen() {
    return new FormGroup({
      imagen: new FormControl(null, Validators.required)
    });
  }

  actualizarPerfil(formulario: FormGroup) {
    if (formulario.invalid) {
      return;
    } else {
      this.usuario.nombre = formulario.value.nombre;
      if (!this.usuario.google) {
        this.usuario.email = formulario.value.email;
      }
      this.usuarioService.actualizarUsuario(this.usuario).subscribe(() => {
        this.swalService.toast(this.translateService.instant('DataUpdateSuccess'));
      });
    }
  }
}
