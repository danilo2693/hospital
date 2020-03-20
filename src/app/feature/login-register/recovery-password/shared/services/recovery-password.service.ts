import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { SwalService } from 'src/app/shared/services/swal.service';
import { Icon } from 'src/app/shared/enums/icon.enum';
import { PeticionesService } from '../../../../../core/services/peticiones.service';
import { apiContrasenia } from 'src/app/shared/config/config';
import { RegisterService } from '../../../login/shared/services/register.service';

@Injectable({
  providedIn: 'root'
})
export class RecoveryPasswordService {
  mostrarFormularios = true;
  constructor(
    private peticionesService: PeticionesService,
    private translateService: TranslateService,
    private router: Router,
    private swalService: SwalService,
    private registerService: RegisterService
  ) {}

  verificarToken(resetToken: string) {
    return this.peticionesService.get(
      `${apiContrasenia}/verificar-token/${resetToken}`
    );
  }

  errorEnToken(mensaje = '') {
    this.swalService.confirm(
      '',
      this.translateService.instant(mensaje),
      Icon.ERROR,
      this.translateService.instant('Ok'),
      '',
      { clickConfirm: () => this.router.navigate(['/login']) },
      false
    );
  }

  inicializarFormularioRecoveryPassword() {
    return new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  inicializarFormularioNuevaContrasenia() {
    return new FormGroup(
      {
        password: new FormControl(null, Validators.required),
        password2: new FormControl(null, Validators.required)
      },
      { validators: this.registerService.sonIguales('password', 'password2') }
    );
  }

  enviarCorreo(formulario: FormGroup) {
    if (formulario.invalid) {
      return;
    } else {
      this.peticionesService.post(`${apiContrasenia}/recuperar`, { email: formulario.value.email }).subscribe(() => {
        this.correoEnviado(formulario.value.email);
      });
    }
  }

  correoEnviado(email: string) {
    this.swalService.confirm(
      '',
      this.translateService.instant('SendRecoveryEmailSuccessfully', { email }),
      Icon.SUCCESS,
      this.translateService.instant('Ok'),
      '',
      { clickConfirm: () => this.router.navigate(['/login']) },
      false
    );
  }

  cambiarContrasenia(formulario: FormGroup, resetToken: string) {
    if (formulario.invalid) {
      return;
    } else {
      this.peticionesService
        .put(`${apiContrasenia}/nueva-contrasenia`, { password: formulario.value.password, resetToken })
        .subscribe((respuesta: any) => {
          this.mostrarFormularios = false;
        });
    }
  }
}
