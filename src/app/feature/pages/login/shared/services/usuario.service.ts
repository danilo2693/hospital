import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { apiUsuario, apiLogin, apiLoginGoogle, apiUpload, apiBusquedaColeccion } from 'src/app/shared/config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PeticionesService } from 'src/app/core/services/peticiones.service';
import { isNullOrUndefined } from 'util';
import { SwalService } from '../../../../../shared/services/swal.service';
import { TranslateService } from '@ngx-translate/core';
import { Tabla } from 'src/app/shared/enums/tablas.enum';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  menu: any = [];

  constructor(
    private peticionesService: PeticionesService,
    private router: Router,
    private translateService: TranslateService,
    private swalService: SwalService
  ) {
    this.cargarStorage();
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.token = token;
    this.usuario = usuario;
    this.menu = menu;
  }

  estaLogueado() {
    const tamanioToken = 5;
    return this.token.length > tamanioToken;
  }

  iniciarSesion(usuario: Usuario, recordarme = false, google = false, token = null) {
    if (recordarme) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    return this.peticionesService.post(google ? apiLoginGoogle : apiLogin, token ? { token } : usuario).pipe(
      map((respuesta: any) => {
        this.guardarStorage(respuesta._id, respuesta.token, respuesta.usuario, respuesta.menu);
        return respuesta.usuario.nombre;
      })
    );
  }

  iniciarSesionGoogle(token) {
    return this.iniciarSesion(null, false, true, token);
  }

  cerrarSesion() {
    this.usuario = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }

  crearUsuario(usuario: Usuario) {
    return this.peticionesService.post(apiUsuario, usuario).pipe(
      map((respuesta: any) => {
        return respuesta.usuario;
      })
    );
  }

  obtenerUsuarios(desde = 0) {
    return this.peticionesService.get(`${apiUsuario}?desde=${desde}`);
  }

  buscarColeccion(tabla: string, palabra) {
    if (tabla.includes(Tabla.USUARIO) || tabla.includes(Tabla.HOSPITAL) || tabla.includes(Tabla.MEDICO)) {
      return this.peticionesService.get(`${apiBusquedaColeccion}/${tabla}/${palabra}`);
    } else {
      return;
    }
  }

  eliminarUsuario(id: string) {
    return this.peticionesService.delete(`${apiUsuario}/${id}?token=${this.token}`);
  }

  actualizarUsuario(usuario: Usuario) {
    return this.peticionesService.put(`${apiUsuario}/${usuario._id}?token=${this.token}`, usuario).pipe(
      map((respuesta: any) => {
        if (usuario._id === this.usuario._id) {
          this.usuario = respuesta.usuario;
          this.guardarStorage(respuesta.usuario._id, this.token, respuesta.usuario, this.menu);
          if (localStorage.getItem('email')) {
            localStorage.setItem('email', respuesta.usuario.email);
          }
        }
        return respuesta.usuario;
      })
    );
  }

  actualizarImagen(archivo, tabla?: string, id?: string) {
    let peticion;
    if (!isNullOrUndefined(archivo)) {
      const formData = new FormData();
      formData.append('imagen', archivo, archivo.name);
      peticion = this.peticionesService.put(`${apiUpload}/${tabla}/${id}`, formData, undefined, true).pipe(
        map((respuesta: any) => {
          this.swalService.toast(this.translateService.instant('PhotoUpdateSuccess'));
          if (id === this.usuario._id) {
            this.usuario = respuesta.usuario;
            this.guardarStorage(respuesta.usuario._id, this.token, respuesta.usuario, this.menu);
          }
          return respuesta;
        })
      );
    }
    return peticion;
  }

  obtenerRoles() {
    return this.peticionesService.get('assets/data/roles.json');
  }
}
