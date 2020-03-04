import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/feature/pages/login/shared/services/usuario.service';
import { SidebarService } from './shared/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(public sidebarService: SidebarService, private usuarioService: UsuarioService) { }

  ngOnInit() {

  }

  cerrarSesion() {
    this.usuarioService.cerrarSesion();
  }
}
