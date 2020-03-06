import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HTTP_ERRORES_CODIGO } from 'src/app/shared/config/httpErroresCodigo';
import { SwalService } from '../../shared/services/swal.service';
import { TranslateService } from '@ngx-translate/core';
import { Icon } from 'src/app/shared/enums/icon.enum';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(
    @Inject(HTTP_ERRORES_CODIGO) private httpError,
    private swalService: SwalService,
    private translateService: TranslateService
  ) {}

  handleError(error: string | Error): void {
    const mensajeError = this.mensajePorDefecto(error);
    this.alertaError(mensajeError);
  }

  private alertaError(mensaje = this.translateService.instant('UnexpectedError')): void {
    this.imprimirErrorConsola(mensaje);
    try {
      if (typeof mensaje === 'string') {
        this.swalService.alert('Error', mensaje, Icon.ERROR);
      } else if (mensaje.hasOwnProperty('error')) {
        this.swalService.alert(
          'Error',
          mensaje.error ? this.translateService.instant(mensaje.error.mensaje) : '',
          Icon.ERROR
        );
      }
    } catch (error) {}
  }

  private mensajePorDefecto(error) {
    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        return this.translateService.instant('NotInternetConnection');
      }
      if (error.hasOwnProperty('status') && !error.error.hasOwnProperty('mensaje')) {
        return this.httpError(error.status);
      }
    }
    return error;
  }

  private imprimirErrorConsola(mensaje): void {
    const respuesta = {
      fecha: new Date().toLocaleString(),
      path: window.location.href,
      mensaje
    };
    if (!environment.production) {
      window.console.error('Error:\n', respuesta);
    }
  }
}
