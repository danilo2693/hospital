import { InjectionToken } from '@angular/core';
const http400 = 400;
const http403 = 403;
const http404 = 404;
const http405 = 405;
const http500 = 500;
const http501 = 501;
const http503 = 503;
const http504 = 504;
export const ERRORES_CODIGO = (codigo: number): string => {
  switch (codigo) {
    case http400:
      return 'El servidor no puede procesar la petición por un error de sintaxis del cliente.';
    case http403:
      return 'Acceso denegado.';
    case http404:
      return 'No se encuentra la petición.';
    case http405:
      return 'Se ha hecho una petición con un recurso no soportado por ese recurso (GET, POST, PUT, DELETE).';
    case http500:
      return 'Error inesperado en el servidor.';
    case http501:
      return 'El servidor no reconoce el método del la petición o carece de la capacidad para completarlo.';
    case http503:
      return 'El servidor no esta disponible.';
    case http504:
      return 'El tiempo de espera para la petición se ha excedido';
    default:
      return 'Error inesperado en la petición';
  }
};

export const HTTP_ERRORES_CODIGO = new InjectionToken('HTTP_ERRORES_CODIGO', {
  providedIn: 'root',
  factory: () => ERRORES_CODIGO
});
