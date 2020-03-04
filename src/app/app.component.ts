import { Component } from '@angular/core';
import { SettingsService } from './feature/pages/account-settings/shared/services/settings.service';
import { LanguageService } from './core/services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hospital';
  constructor(public settingsService: SettingsService, public languageService: LanguageService) { }
}
