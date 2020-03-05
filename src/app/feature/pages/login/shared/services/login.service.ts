import { Injectable, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
import { SwalService } from 'src/app/shared/services/swal.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private translateService: TranslateService,
    private usuarioService: UsuarioService,
    private router: Router,
    private swalService: SwalService,
    private zone: NgZone
  ) {}

  inicializarFormularioLogin(emailLocalStorage, recordameLocalStorage) {
    return new FormGroup({
      email: new FormControl(emailLocalStorage, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      recordarme: new FormControl(recordameLocalStorage)
    });
  }

  iniciarSesion(formulario) {
    if (formulario.invalid) {
      return;
    }
    const usuario = new Usuario(null, formulario.value.email, formulario.value.password);
    this.usuarioService.iniciarSesion(usuario, !!formulario.value.recordarme).subscribe((nombreUsuario: string) => {
      formulario.reset();
      this.bienvenidoYRedireccionDashboard(nombreUsuario);
    });
  }

  iniciarSesionGoogle(token) {
    this.usuarioService.iniciarSesionGoogle(token).subscribe((nombreUsuario: string) => {
      this.bienvenidoYRedireccionDashboard(nombreUsuario);
    });
  }

  cerrarSesion() {
    this.usuarioService.cerrarSesion();
  }

  bienvenidoYRedireccionDashboard(nombreUsuario: string) {
    const bienvenidoTraducido = this.translateService.instant('Welcome');
    this.swalService.toast(`${bienvenidoTraducido} ${nombreUsuario}`);
    this.zone.run(() => {
      this.router.navigate(['/dashboard']);
    });
  }
}
