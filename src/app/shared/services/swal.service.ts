import { Injectable, EventEmitter } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';
import { Icon } from '../enums/icon.enum';

@Injectable({
  providedIn: 'root'
})
export class SwalService {
  clickConfirm: EventEmitter<void>;
  clickCancel: EventEmitter<void>;
  subGuardar;
  subNoGuardar;

  constructor() {
    this.iniciarObservables();
  }

  iniciarObservables() {
    this.clickConfirm = new EventEmitter();
    this.clickCancel = new EventEmitter();
  }

  alert(title, text, icon = Icon.SUCCESS) {
    this.iniciarObservables();
    Swal.fire(title, text, icon as SweetAlertIcon);
  }

  toast(title: string, icon = Icon.SUCCESS, position = 'top-start') {
    this.iniciarObservables();
    Swal.mixin({
      toast: true,
      position: position as SweetAlertPosition,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: toast => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    }).fire({
      icon: icon as SweetAlertIcon,
      title
    });
  }

  confirm(
    title = '',
    text = '',
    icon = 'warning',
    confirmButtonText = '',
    cancelButtonText = '',
    { clickConfirm = () => {}, clickCancel = () => {} } = {}
  ) {
    this.iniciarObservables();
    return Swal.fire({
      title,
      text,
      icon: icon as SweetAlertIcon,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText,
      cancelButtonText
    }).then(result => {
      if (result.value) {
        this.clickConfirm.subscribe(() => clickConfirm());
        this.clickConfirm.emit();
        this.clickConfirm.unsubscribe();
      } else {
        this.clickCancel.subscribe(() => clickCancel());
        this.clickCancel.emit();
        this.clickCancel.unsubscribe();
      }
    });
  }
}
