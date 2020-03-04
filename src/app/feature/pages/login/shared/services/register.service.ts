import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-start',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(
    private translateService: TranslateService,
    private usuarioService: UsuarioService,
    private router: Router) {}

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
      this.usuarioService.crearUsuario(usuario)
        .subscribe(respuesta => {
          formulario.reset();
          Toast.fire({
            icon: 'success',
            title: this.translateService.instant('SuccessCreateUser')
          });
          this.router.navigate(['/login']);
        });
    } else {
      Swal.fire(
        this.translateService.instant('Important'),
        this.translateService.instant('MustAcceptConditions'),
        'warning'
      );
    }
  }
}
