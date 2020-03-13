import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Medico } from '../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicosFormularioService {
  medicoForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.medicoForm = this.formBuilder.group({
      medicos: this.formBuilder.array([])
    });
  }

  inicializarFormularioMedico(medico?: Medico) {
    if (medico) {
      return new FormGroup({
        _id: new FormControl(medico._id),
        nombre: new FormControl(medico.nombre, Validators.required),
        hospital: new FormControl(medico.hospital, Validators.required),
        img: new FormControl(medico.img)
      });
    } else {
      return new FormGroup({
        _id: new FormControl(null),
        nombre: new FormControl(null, Validators.required),
        hospital: new FormControl(null, Validators.required),
        img: new FormControl(null)
      });
    }
  }

  medicoControl(medico): FormGroup {
    return this.formBuilder.group({
      _id: [medico._id, Validators.required],
      nombre: [medico.nombre, Validators.required],
      hospital: medico.hospital,
      img: medico.img
    });
  }

  agregarMedico(medico) {
    const control = this.medicoForm.get('medicos') as FormArray;
    control.push(this.medicoControl(medico));
  }

  agregarVariosMedicos(medicos) {
    this.inicializarFormulario();
    medicos.forEach(medico => {
      this.agregarMedico(medico);
    });
  }

  public get medicoFormularioRegistros(): FormArray {
    return this.medicoForm.get('medicos') as FormArray;
  }

  public get medicoFormularioValue(): Array<any> {
    return this.medicoFormularioRegistros.value as Array<any>;
  }

  remover(indice: number) {
    const control = this.medicoForm.get('medicos') as FormArray;
    control.removeAt(indice);
  }
  save() {
    return this.medicoForm.value;
  }
}
