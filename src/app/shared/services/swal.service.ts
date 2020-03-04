import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {
  constructor() {}

  toast(icon = 'success' as SweetAlertIcon, title: string) {
    Swal.mixin({
      toast: true,
      position: 'top-start',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: toast => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    }).fire({
      icon,
      title
    });
  }

  confirm(
    title = '',
    text = '',
    icon = 'warning' as SweetAlertIcon,
    confirmButtonText = '',
    cancelButtonText = '',
    titleSuccess = '',
    textSuccess = ''
  ) {
    Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText,
      cancelButtonText
    }).then(result => {
      if (result.value) {
        Swal.fire(titleSuccess, textSuccess, 'success');
      }
    });
  }
}
