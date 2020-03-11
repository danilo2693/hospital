import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
import { SwalService } from 'src/app/shared/services/swal.service';
import { Icon } from 'src/app/shared/enums/icon.enum';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(
    private translateService: TranslateService,
    private usuarioService: UsuarioService,
    private router: Router,
    private swalService: SwalService
  ) {}

  inicializarFormularioRegistro() {
    return new FormGroup(
      {
        nombre: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        password2: new FormControl(null, Validators.required),
        condiciones: new FormControl(false)
      },
      { validators: this.sonIguales('password', 'password2') }
    );
  }

  sonIguales(primerCampo: string, segundoCampo: string) {
    return (group: FormGroup) => {
      const valorPrimerCampo = group.controls[primerCampo].value;
      const valorSegundoCampo = group.controls[segundoCampo].value;
      if (valorPrimerCampo === valorSegundoCampo) {
        return null;
      } else {
        return {
          sonIguales: true
        };
      }
    };
  }

  registrarUsuario(formulario: FormGroup) {
    if (formulario.invalid) {
      return;
    }
    if (formulario.value.condiciones) {
      const usuario = new Usuario(formulario.value.nombre, formulario.value.email, formulario.value.password);
      this.usuarioService.crearUsuario(usuario).subscribe(() => {
        formulario.reset();
        this.swalService.toast(this.translateService.instant('SuccessCreateUser'));
        this.router.navigate(['/login']);
      });
    } else {
      this.swalService.alert(
        this.translateService.instant('Important'),
        this.translateService.instant('MustAcceptConditions'),
        Icon.WARNING
      );
    }
  }
}
