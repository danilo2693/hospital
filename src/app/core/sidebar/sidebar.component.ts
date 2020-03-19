import { Component, OnInit } from '@angular/core';
import { SidebarService } from './shared/services/sidebar.service';
import { UsuarioService } from 'src/app/feature/login-register/login/shared/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  constructor(public sidebarService: SidebarService, public usuarioService: UsuarioService) {}

  ngOnInit() {
    this.sidebarService.cargarMenu();
  }

  cerrarSesion() {
    this.usuarioService.cerrarSesion();
  }
}
