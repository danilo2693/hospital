import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/feature/login-register/login/shared/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  constructor(public usuarioService: UsuarioService, public languageService: LanguageService, private router: Router) {}

  ngOnInit() {}

  buscar(termino: string) {
    this.router.navigate(['search/', termino]);
  }
}
