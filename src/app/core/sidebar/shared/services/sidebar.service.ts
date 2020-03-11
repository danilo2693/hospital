import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any = [
    {
      titulo: 'Main',
      icono: 'mdi mdi-gauge',
      submenu: [
        { subtitulo: 'Dashboard', url: '/dashboard' },
        { subtitulo: 'ProgressBar', url: '/progress' },
        { subtitulo: 'Graphics', url: '/graficas1' },
        { subtitulo: 'Promises', url: '/promesas' },
        { subtitulo: 'Rxjs', url: '/rxjs' },
      ]
    },
    {
      titulo: 'Maintenance',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { subtitulo: 'Users', url: '/users'},
        { subtitulo: 'Hospitals', url: '/hospitals'},
        { subtitulo: 'Doctors', url: '/doctors'},
      ]
    }
  ];
  constructor() {}
}
