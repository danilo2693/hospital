import { Component, OnInit } from '@angular/core';
import { UploadImageService } from 'src/app/shared/services/upload-image.service';
import { MedicosFormularioService } from './shared/services/medicos-formulario.service';
import { FormGroup } from '@angular/forms';
import { MedicoService } from './shared/services/medico.service';
import { TranslateService } from '@ngx-translate/core';
import { SwalService } from '../../../shared/services/swal.service';
import { Hospital } from '../hospitales/shared/models/hospital.model';
import { HospitalService } from '../hospitales/shared/services/hospital.service';
import { Observable, forkJoin, of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Medico } from './shared/models/medico.model';
import { map } from 'rxjs/operators';
import { Icon } from 'src/app/shared/enums/icon.enum';
import { ErroresService } from 'src/app/shared/services/errores.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  formularioMedico: FormGroup;
  hospitales: Hospital[] = [];
  informacionHospitalSeleccionado: Observable<Hospital>;
  id: string;
  constructor(
    public uploadImageService: UploadImageService,
    public medicosFormularioService: MedicosFormularioService,
    public medicoService: MedicoService,
    private hospitalService: HospitalService,
    private translateService: TranslateService,
    private swalService: SwalService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public erroresService: ErroresService
  ) {}

  ngOnInit() {
    this.inicializarFormularioMedico();
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.cargarObservableMedicoYHospitales();
    this.uploadImageService.notificar.subscribe(respuesta => {
      this.formularioMedico.value.img = respuesta.medico.img;
    });
  }

  inicializarFormularioMedico(medico?: Medico) {
    this.formularioMedico = this.medicosFormularioService.inicializarFormularioMedico(medico);
    this.uploadImageService.inicializarVariables('', 'medico', this.formularioMedico.value._id);
  }

  cargarObservableMedicoYHospitales() {
    return forkJoin(this.cargarMedico(), this.cargarHospitales())
      .pipe(
        map(([medico, hospitales]) => {
          return { medico, hospitales };
        })
      )
      .subscribe(
        (respuesta: any) => {
          this.hospitales = respuesta.hospitales.hospitales
            ? respuesta.hospitales.hospitales
            : respuesta.hospitales.hospital;
          this.cargarMedicoEnFormulario(respuesta.medico as Medico);
        },
        error => {
          this.swalService.alert('Error', error.error.mensaje, Icon.ERROR);
          this.router.navigate(['/doctor/', 'new']);
        }
      );
  }

  cargarMedico() {
    if (this.id !== 'new') {
      return this.medicoService.obtenerMedicoPorId(this.id);
    } else {
      return of(null);
    }
  }

  cargarMedicoEnFormulario(medico: Medico) {
    if (medico) {
      medico.hospital = this.hospitales.find(hospital => hospital._id === medico.hospital._id);
      this.cambioHospital(medico.hospital._id);
    }
    this.inicializarFormularioMedico(medico);
  }

  cargarHospitales() {
    return this.hospitalService.obtenerHospitales();
  }

  crearOEditarMedico() {
    if (this.formularioMedico.invalid) {
      return;
    } else {
      if (this.id === 'new') {
        this.medicoService.crearMedico(this.formularioMedico.value).subscribe((medico: Medico) => {
          this.finalizoCreacionOEdicionMedico('CreateDoctorSuccess', medico);
        });
      } else {
        this.medicoService.actualizarMedico(this.formularioMedico.value).subscribe((medico: Medico) => {
          this.finalizoCreacionOEdicionMedico('UpdateDoctorSuccess', medico);
        });
      }
    }
  }

  finalizoCreacionOEdicionMedico(mensaje: string, medico: Medico) {
    this.swalService.toast(this.translateService.instant(mensaje));
    this.inicializarFormularioMedico(medico);
    this.router.navigate(['/doctor/', medico._id]);
    this.id = medico._id;
  }

  cambioHospital(idHospital?: string) {
    const hospitalFormulario = this.formularioMedico.value.hospital;
    if (hospitalFormulario || idHospital) {
      const id = idHospital ? idHospital : hospitalFormulario._id;
      this.informacionHospitalSeleccionado = this.hospitalService.obtenerHospitalPorId(id);
    }
  }

  cancelar() {
    window.history.back();
  }
}
