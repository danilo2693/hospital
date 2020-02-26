import { Component } from '@angular/core';
import { SettingsService } from './shared/services/service.index';
import { LanguageService } from './shared/services/service.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hospital';
  constructor(public settingsService: SettingsService, public languageService: LanguageService) { }
}
