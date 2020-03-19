import { Injectable } from '@angular/core';
import { CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/feature/login-register/login/shared/services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificarTokenGuard implements CanActivateChild {
  unMilisegundo = 1000;
  constructor(private usuarioService: UsuarioService) {}
  canActivateChild(): boolean | Observable<boolean> | Promise<boolean> {
    const token = this.usuarioService.token;
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (this.tokenExpirado(payload.exp)) {
      this.usuarioService.cerrarSesion();
      return false;
    }
    return this.hayQueRenovarToken(payload.exp);
  }

  tokenExpirado(fechaExp: number) {
    const ahora = new Date().getTime() / this.unMilisegundo;
    return fechaExp < ahora;
  }

  hayQueRenovarToken(fechaExp: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const tokenExp = new Date(fechaExp * this.unMilisegundo);
      const ahora = new Date();
      const cuatroHoras = 4;
      const sesentaSegundos = 60;
      ahora.setTime(ahora.getTime() + cuatroHoras * sesentaSegundos * sesentaSegundos * this.unMilisegundo);
      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        this.usuarioService.renovarToken().subscribe(
          () => {
            window.console.log('renovado!');
            resolve(true);
          },
          () => {
            this.usuarioService.cerrarSesion();
            reject(false);
          }
        );
      }
      resolve(true);
    });
  }
}
