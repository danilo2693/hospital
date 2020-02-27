import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscripcion: Subscription;

  constructor() {
    // const numeroIntentos = 2;
    this.subscripcion = this.retornarObservable()
      // .pipe(
      // reintenta n veces la ejecución del subscribe
      //   retry(numeroIntentos)
      // )
      .subscribe(
        contador => {
          // callback for next()
          window.console.log(`El observable notificó : ${contador}`);
        },
        error => {
          // callback for error()
          window.console.error(`Error en el observable: ${error}`);
        },
        () => {
          // callback for complete()
          window.console.log('El observable terminó');
        }
      );
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
    window.console.log('El component rxjs se destruyó y se ejecutó el unsubscribe');
  }

  retornarObservable(): Observable<any> {
    const unSegundoEnMilisegundos = 1000;
    const divisor = 2;
    return new Observable((observer: Subscriber<any>) => {
      let contador = 0;
      // const intervalo = setInterval(() => {
      setInterval(() => {
        contador++;
        const salida = {
          valor: contador
        };
        observer.next(salida);
        // const tresSegundos = 3;
        // const dosSegundos = 2;
        // if (contador === tresSegundos) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
        // else if (contador === dosSegundos) {
        //   clearInterval(intervalo);
        //   observer.error('Soy un error');
        // }
      }, unSegundoEnMilisegundos);
    }).pipe(
      map(respuesta => respuesta.valor),
      filter(respuesta => respuesta % divisor !== 0)
    );
  }
}
