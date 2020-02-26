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
        { subtitulo: 'Graphics', url: '/graficas1' }
      ]
    }
  ];
  constructor() {}
}
