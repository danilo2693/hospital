import { Component, OnInit } from '@angular/core';
import { SettingsService } from './shared/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {
  constructor(public settingsService: SettingsService) {}

  ngOnInit() {
    this.aplicarCheck();
  }

  cambiarColorTema(colorTema: string, link: any) {
    this.settingsService.aplicarTema(colorTema);
    this.limpiarYAplicarCheck(link);
  }

  limpiarYAplicarCheck(link: any) {
    const selectores = document.getElementsByClassName('selector');
    Array.from(selectores).forEach(selector => {
      selector.classList.remove('working');
    });
    link.classList.add('working');
  }

  aplicarCheck() {
    const selectores = document.getElementsByClassName('selector');
    const tema = this.settingsService.ajustes.tema;
    Array.from(selectores).forEach(selector => {
      if (selector.getAttribute('data-theme') === tema) {
        selector.classList.add('working');
        return true;
      }
    });
  }
}
