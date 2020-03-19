import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class HospitalesFormularioService {
  hospitalForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.hospitalForm = this.formBuilder.group({
      hospitales: this.formBuilder.array([])
    });
  }

  hospitalControl(hospital): FormGroup {
    return this.formBuilder.group({
      _id: [hospital._id, Validators.required],
      nombre: [hospital.nombre, Validators.required],
      img: [hospital.img, Validators.required]
    });
  }

  agregarHospital(hospital) {
    const control = this.hospitalForm.get('hospitales') as FormArray;
    control.push(this.hospitalControl(hospital));
  }

  agregarVariosHospitales(hospitales) {
    this.inicializarFormulario();
    hospitales.forEach(hospital => {
      this.agregarHospital(hospital);
    });
  }

  public get hospitalFormularioRegistros(): FormArray {
    return this.hospitalForm.get('hospitales') as FormArray;
  }

  public get hospitalFormularioValue(): Array<any> {
    return this.hospitalFormularioRegistros.value as Array<any>;
  }

  remover(indice: number) {
    const control = this.hospitalForm.get('hospitales') as FormArray;
    control.removeAt(indice);
  }
  save() {
    return this.hospitalForm.value;
  }
}
