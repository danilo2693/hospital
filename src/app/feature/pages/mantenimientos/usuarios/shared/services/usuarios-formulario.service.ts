import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsuariosFormularioService {
  usuarioForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.usuarioForm = this.formBuilder.group({
      usuarios: this.formBuilder.array([])
    });
  }

  usuarioControl(usuario): FormGroup {
    return this.formBuilder.group({
      _id: [usuario._id, Validators.required],
      nombre: [usuario.nombre, Validators.required],
      img: [usuario.img, Validators.required],
      email: [usuario.email, Validators.required],
      google: [usuario.google, Validators.required],
      role: [usuario.role, Validators.required]
    });
  }

  agregarUsuario(usuario) {
    const control = this.usuarioForm.get('usuarios') as FormArray;
    control.push(this.usuarioControl(usuario));
  }

  agregarVariosUsuarios(usuarios) {
    this.inicializarFormulario();
    usuarios.forEach(usuario => {
      this.agregarUsuario(usuario);
    });
  }

  public get usuarioFormularioRegistros(): FormArray {
    return this.usuarioForm.get('usuarios') as FormArray;
  }

  public get usuarioFormularioValue(): Array<any> {
    return this.usuarioFormularioRegistros.value as Array<any>;
  }

  remover(indice: number) {
    const control = this.usuarioForm.get('users') as FormArray;
    control.removeAt(indice);
  }
  save() {
    return this.usuarioForm.value;
  }
}
