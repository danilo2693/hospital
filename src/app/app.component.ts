import { Component } from '@angular/core';
import { LanguageService } from './core/services/language.service';
import { SettingsService } from './feature/pages/account/account-settings/shared/services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'hospital';
  constructor(public settingsService: SettingsService, public languageService: LanguageService) {}
}
