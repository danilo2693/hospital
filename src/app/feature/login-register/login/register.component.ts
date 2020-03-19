import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegisterService } from './shared/services/register.service';
import { ErroresService } from 'src/app/shared/services/errores.service';

declare function init_plugins();
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
  formulario: FormGroup;

  constructor(private registerService: RegisterService, public erroresService: ErroresService) {}

  ngOnInit() {
    init_plugins();
    this.formulario = this.registerService.inicializarFormularioRegistro();
  }

  registrarUsuario() {
    this.registerService.registrarUsuario(this.formulario);
  }
}
