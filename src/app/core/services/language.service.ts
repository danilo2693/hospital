import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(public translateService: TranslateService, private router: Router) {
    translateService.addLangs(['es', 'en']);
    if (localStorage.getItem('locale')) {
      const lenguajeSessionStorage = localStorage.getItem('locale');
      translateService.use(lenguajeSessionStorage.match(/es|en/) ? lenguajeSessionStorage : 'es');
    } else {
      localStorage.setItem('locale', 'es');
      translateService.setDefaultLang('es');
    }
  }

  cambiarLenguaje(language: string) {
    localStorage.setItem('locale', language);
    this.translateService.use(language);
    window.location.reload();
  }
}
