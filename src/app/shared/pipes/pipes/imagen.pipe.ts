import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { apiImagen } from '../../config/config';
import { Tabla } from '../../enums/tablas.enum';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
  transform(img: string, tabla = 'usuario'): any {
    const url = apiImagen;
    if (!img) {
      return url + '/usuario/x';
    } else if (img.includes('googleusercontent')) {
      return img;
    } else {
      switch (tabla) {
        case Tabla.USUARIO:
          return `${url}/${Tabla.USUARIO}/${img}`;
        case Tabla.HOSPITAL:
          return `${url}/${Tabla.HOSPITAL}/${img}`;
        case Tabla.MEDICO:
          return `${url}/${Tabla.MEDICO}/${img}`;
        default:
          return url + '/usuario/x';
      }
    }
  }
}
