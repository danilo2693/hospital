import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default-dark.css',
    tema: 'default'
  };
  constructor() {
    this.cargarAjustes();
  }

  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
    const ajustesLocalStorage = localStorage.getItem('ajustes');
    if (!isNullOrUndefined(ajustesLocalStorage)) {
      this.ajustes = JSON.parse(ajustesLocalStorage);
      this.aplicarTema(this.ajustes.tema);
    } else {
      this.aplicarTema(this.ajustes.tema);
    }
  }

  aplicarTema(colorTema: string) {
    const ruta = `assets/css/colors/${colorTema}.css`;
    document.getElementById('color-tema').setAttribute('href', ruta);
    this.ajustes.tema = colorTema;
    this.ajustes.temaUrl = ruta;
    this.guardarAjustes();
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
