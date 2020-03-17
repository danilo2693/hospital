import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/feature/pages/login/shared/services/usuario.service';
import { LanguageService } from '../services/language.service';
import { Usuario } from '../../feature/pages/login/shared/models/usuario.model';
import { Router } from '@angular/router';

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
