import { Component, OnInit } from '@angular/core';
import { RecoveryPasswordService } from './shared/services/recovery-password.service';
import { FormGroup } from '@angular/forms';
import { ErroresService } from '../../../shared/services/errores.service';
import { ActivatedRoute } from '@angular/router';
declare function init_plugins();
@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styles: []
})
export class RecoveryPasswordComponent implements OnInit {
  formulario: FormGroup;
  formularioNuevoPassword: FormGroup;
  hayToken = false;
  resetToken = '';
  constructor(
    public recoveryPasswordService: RecoveryPasswordService,
    public erroresService: ErroresService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    init_plugins();
    this.formularioNuevoPassword = this.recoveryPasswordService.inicializarFormularioNuevaContrasenia();
    this.formulario = this.recoveryPasswordService.inicializarFormularioRecoveryPassword();
    this.resetToken = this.activatedRoute.snapshot.paramMap.get('resetToken');

    if (this.resetToken) {
      this.hayToken = true;
      this.verificarToken(this.resetToken);
    }
  }

  verificarToken(resetToken: string) {
    this.recoveryPasswordService.verificarToken(resetToken).subscribe(
      () => {},
      error => this.recoveryPasswordService.errorEnToken(error.error.mensaje)
    );
  }

  enviarCorreo() {
    this.recoveryPasswordService.enviarCorreo(this.formulario);
  }

  cambiarContrasenia() {
    this.recoveryPasswordService.cambiarContrasenia(this.formularioNuevoPassword, this.resetToken);
  }
}
