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
      const browserLanguage = translateService.getBrowserLang();
      let currentLanguage;
      if (translateService.getLangs().includes(browserLanguage)) {
        currentLanguage = browserLanguage;
      } else {
        currentLanguage = 'es';
      }
      localStorage.setItem('locale', currentLanguage);
      translateService.setDefaultLang(currentLanguage);
    }
  }

  cambiarLenguaje(language: string) {
    localStorage.setItem('locale', language);
    this.translateService.use(language);
    window.location.reload();
  }
}
