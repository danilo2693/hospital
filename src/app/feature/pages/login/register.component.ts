import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from './shared/services/register.service';
import { TranslateService } from '@ngx-translate/core';
import { UsuarioService } from './shared/services/usuario.service';

declare function init_plugins();
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private registerService: RegisterService
  ) { }

  ngOnInit() {
    init_plugins();
    this.formulario = this.registerService.inicializarFormularioRegistro();
  }

  registrarUsuario() {
    this.registerService.registrarUsuario(this.formulario);
  }

}
