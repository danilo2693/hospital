import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginService } from './shared/services/login.service';

declare function init_plugins();
declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  auth2: any;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    const email = localStorage.getItem('email') || '';
    const recuerdame = email.length > 1;
    this.formulario = this.loginService.inicializarFormularioLogin(email, recuerdame);
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '211575268817-4tt0bmo6m9ss2edg9auriefcd3nr2t6m.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSingIn(document.getElementById('btnGoogle'));
    });
  }

  attachSingIn(element) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this.loginService.iniciarSesionGoogle(token);
    });
  }

  iniciarSesion() {
    this.loginService.iniciarSesion(this.formulario);
  }

}
