import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {
  constructor() {
    this.contarHasta3()
      .then(mensaje => {
        window.console.log(mensaje);
      })
      .catch(error => {
        window.console.error('Error en la promesa: ', error);
      });
  }

  ngOnInit() {}

  contarHasta3() {
    const unSegundoEnMilisegundos = 1000;
    return new Promise((resolve, reject) => {
      let contador = 0;
      const tresSegundos = 3;
      const intervalo = setInterval(() => {
        contador += 1;
        window.console.log(contador);
        if (contador === tresSegundos) {
          resolve('La promesa terminó');
          // reject('error controlado');
          clearInterval(intervalo);
        }
      }, unSegundoEnMilisegundos);
    });
  }
}
