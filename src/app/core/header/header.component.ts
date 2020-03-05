import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/feature/pages/login/shared/services/usuario.service';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, public languageService: LanguageService) { }

  ngOnInit() {
  }

  cerrarSesion() {
    this.usuarioService.cerrarSesion();
  }
}
